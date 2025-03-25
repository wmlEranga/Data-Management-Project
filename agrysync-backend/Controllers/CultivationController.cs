using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using agrysync_backend.Data;
using agrysync_backend.Models;
using agrysync_backend.Dtos;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CultivationController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public CultivationController(AgrysyncDbContext dbContext, ILogger<ProjectController> logger)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpPost("create-cultivation")]
        public IActionResult CreateCultivation([FromBody] CultivationDto cultivation)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Ensure the date is in UTC format
                DateTime utcDate = cultivation.DateRecorded.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(cultivation.DateRecorded, DateTimeKind.Utc)
                    : cultivation.DateRecorded.ToUniversalTime();

                var cultivationData = new CultivationData
                {
                    CropId = cultivation.CropId,
                    DateRecorded = utcDate, // Use the UTC date
                    GrowthStageId = cultivation.GrowthStageId,
                    WaterLevelId = cultivation.WaterLevelId,
                    FertilizerUsed = cultivation.FertilizerUsed,
                    PesticideUsed = cultivation.PesticideUsed,
                    DiseaseReport = cultivation.DiseaseReport,
                    DiseaseId = cultivation.DiseaseId,
                    PesticideId = cultivation.PesticideId
                };

                _dbContext.CultivationData.Add(cultivationData);
                _dbContext.SaveChanges();

                return Ok(new { message = "Cultivation data saved successfully", id = cultivationData.CultivationDataId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating cultivation data");
                return StatusCode(500, $"An error occurred while saving cultivation data: {ex.Message}");
            }
        }

        //get cultivation data by crop id
        [HttpGet("get-cultivation/{cropId}")]
        public async Task<IActionResult> GetCultivationByCropId(int cropId)
        {
            try
            {
                var cultivationData = await _dbContext.CultivationData
                    .Where(c => c.CropId == cropId)
                    .Select(c => new
                    {
                        c.CultivationDataId,
                        c.DateRecorded,
                        GrowthStageName = c.GrowthStage.GrowthStageName,
                        WaterLevelName = c.WaterLevel.WaterLevelName,
                        c.FertilizerUsed,
                        c.PesticideUsed,
                        c.DiseaseReport,
                        DiseaseName = c.Disease != null ? c.Disease.DiseaseName : null,
                        PesticideName = c.Pesticide != null ? c.Pesticide.PesticideName : null
                    })
                    .ToListAsync();

                return Ok(cultivationData);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("growth-stages")]
        public async Task<IActionResult> GetGrowthStages()
        {
            try
            {
                var growthStages = await _dbContext.GrowthStages
                    .Select(g => new
                    {
                        g.GrowthStageId,
                        g.GrowthStageName,
                        g.Description
                    })
                    .ToListAsync();

                return Ok(growthStages);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving growth stages");
                return StatusCode(500, "An error occurred while retrieving growth stages");
            }
        }

        [HttpGet("water-levels")]
        public async Task<IActionResult> GetWaterLevels()
        {
            try
            {
                var waterLevels = await _dbContext.WaterLevels
                    .Select(w => new
                    {
                        w.WaterLevelId,
                        w.WaterLevelName,
                        w.Description
                    })
                    .ToListAsync();

                return Ok(waterLevels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving water levels");
                return StatusCode(500, "An error occurred while retrieving water levels");
            }
        }

        [HttpGet("diseases")]
        public async Task<IActionResult> GetDiseases()
        {
            try
            {
                var diseases = await _dbContext.Diseases
                    .Select(d => new
                    {
                        d.DiseaseId,
                        d.DiseaseName,
                        d.Description
                    })
                    .ToListAsync();

                return Ok(diseases);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving diseases");
                return StatusCode(500, "An error occurred while retrieving diseases");
            }
        }

        [HttpGet("pesticides")]
        public async Task<IActionResult> GetPesticides()
        {
            try
            {
                var pesticides = await _dbContext.Pesticides
                    .Select(p => new
                    {
                        p.PesticideId,
                        p.PesticideName,
                        p.SafetyPrecautions
                    })
                    .ToListAsync();

                return Ok(pesticides);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving pesticides");
                return StatusCode(500, "An error occurred while retrieving pesticides");
            }
        }
    }
}