using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Data;
using agrysync_backend.Models;
using agrysync_backend.Dtos;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : Controller
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public ProjectController(ILogger<ProjectController> logger, AgrysyncDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpPost("create-project")]
        public IActionResult CreateProject([FromBody] ProjectDto project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add project to the database
            return Ok();
        }

        //get projects by user id
        [HttpGet("get-projects/{userId}")]
        public async Task<IActionResult> GetProjectsByUserId(int userId)
        {
            try
            {
                // Retrieve projects list from fields and crops (unique) join field + crop
                var projects = await _dbContext.Crop
                    .Include(c => c.Field)
                    .Join(_dbContext.Field,
                        c => c.FieldId,
                        f => f.FieldId,
                        (c, f) => new
                        {
                            c.CropId,
                            c.CropType,
                            c.Variety,
                            c.PlantingDate,
                            c.ExpectedHarvestDate,
                            c.Season,
                            f.FieldId,
                            f.FieldName,
                            f.FieldSize,
                            f.SoilType,
                            f.IrrigationType,
                            f.Latitude,
                            f.Longitude,
                            f.FarmerId,
                            f.DateAdded
                        })
                    .Where(p => p.FarmerId == userId)
                    .ToListAsync();


                return Ok(projects);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects for user ID {UserId}", userId);
                return StatusCode(500, "Internal server error");
            }
        }

        //add new project
        [HttpPost]
        public async Task<IActionResult> AddProject([FromBody] ProjectDto projectDto)
        {
            try
            {
                // Create new field
                var field = new Field
                {
                    FieldName = projectDto.fieldName,
                    FieldSize = projectDto.fieldSize,
                    SoilType = projectDto.soilType,
                    IrrigationType = projectDto.irrigationType,
                    Latitude = projectDto.latitude,
                    Longitude = projectDto.longitude,
                    FarmerId = projectDto.farmerId,
                    //timestamp with timezone
                    DateAdded = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)
                };

                // Add field to the database
                _dbContext.Field.Add(field);
                await _dbContext.SaveChangesAsync();

                // Create new crop
                var crop = new Crop
                {
                    CropType = projectDto.cropType,
                    Variety = projectDto.cropVariety,
                    PlantingDate = DateTime.SpecifyKind(projectDto.cropPlantingDate, DateTimeKind.Utc),
                    ExpectedHarvestDate = DateTime.SpecifyKind(projectDto.expectedHarvestDate, DateTimeKind.Utc),
                    FieldId = field.FieldId,
                    Season = projectDto.season
                };

                // Add crop to the database
                _dbContext.Crop.Add(crop);
                await _dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding project for user ID {UserId}", projectDto.farmerId);
                return StatusCode(500, "Internal server error");
            }
        }

        //get project details by cropid
        [HttpGet("get-project-details/{cropId}")]
        public async Task<IActionResult> GetProjectDetailsByCropId(int cropId)
        {
            try
            {
                // Retrieve project details
                var project = await _dbContext.Crop
                    .Include(c => c.Field)
                    .Join(_dbContext.Field,
                        c => c.FieldId,
                        f => f.FieldId,
                        (c, f) => new
                        {
                            c.CropId,
                            c.CropType,
                            c.Variety,
                            c.PlantingDate,
                            c.ExpectedHarvestDate,
                            c.Season,
                            f.FieldId,
                            f.FieldName,
                            f.FieldSize,
                            f.SoilType,
                            f.IrrigationType,
                            f.Latitude,
                            f.Longitude,
                            f.FarmerId,
                            f.DateAdded
                        })
                    .FirstOrDefaultAsync(p => p.CropId == cropId);

                if (project == null)
                {
                    return NotFound();
                }

                return Ok(project);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving project details for crop ID {CropId}", cropId);
                return StatusCode(500, "Internal server error");
            }
        }


    }
}