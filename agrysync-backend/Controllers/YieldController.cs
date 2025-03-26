using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Data;
using agrysync_backend.Models;
using agrysync_backend.Dtos;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class YieldController : ControllerBase
    {
        private readonly ILogger<YieldController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public YieldController(AgrysyncDbContext dbContext, ILogger<YieldController> logger)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpPost("create-yield")]
        public IActionResult CreateYield([FromBody] YieldDataDto yieldDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the crop data to retrieve the season and harvest date
                var crop = _dbContext.Crop.FirstOrDefault(c => c.CropId == yieldDto.CropId);
                if (crop == null)
                {
                    return NotFound($"Crop with ID {yieldDto.CropId} not found");
                }

                // Use the expected harvest date from the crop data
                DateTime harvestDate = crop.ExpectedHarvestDate;

                var yieldData = new YieldData
                {
                    CropId = yieldDto.CropId,
                    HarvestDate = harvestDate,
                    YieldAmount = yieldDto.YieldAmount,
                    GrainQuality = yieldDto.GrainQuality,
                    Season = crop.Season // Use the season from the crop
                };

                _dbContext.YieldData.Add(yieldData);
                _dbContext.SaveChanges();

                return Ok(new
                {
                    message = "Yield data saved successfully",
                    id = yieldData.YieldDataId,
                    harvestDate = harvestDate,
                    season = crop.Season
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating yield data");
                return StatusCode(500, $"An error occurred while saving yield data: {ex.Message}");
            }
        }

        [HttpGet("get-yield/{cropId}")]
        public async Task<IActionResult> GetYieldByCropId(int cropId)
        {
            try
            {
                var yieldData = await _dbContext.YieldData
                    .Where(y => y.CropId == cropId)
                    .Select(y => new
                    {
                        y.YieldDataId,
                        y.HarvestDate,
                        y.YieldAmount,
                        y.GrainQuality,
                        y.Season
                    })
                    .ToListAsync();

                return Ok(yieldData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving yield data");
                return StatusCode(500, "An error occurred while retrieving yield data");
            }
        }

        [HttpGet("get-latest-yield/{cropId}")]
        public async Task<IActionResult> GetLatestYieldByCropId(int cropId)
        {
            try
            {
                var latestYield = await _dbContext.YieldData
                    .Where(y => y.CropId == cropId)
                    .OrderByDescending(y => y.YieldDataId)
                    .Select(y => new
                    {
                        y.YieldDataId,
                        y.HarvestDate,
                        y.YieldAmount,
                        y.GrainQuality,
                        y.Season
                    })
                    .FirstOrDefaultAsync();

                if (latestYield == null)
                {
                    return NotFound("No yield data found for this crop");
                }

                return Ok(latestYield);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving latest yield data");
                return StatusCode(500, "An error occurred while retrieving yield data");
            }
        }

        [HttpPut("update-yield/{id}")]
        public IActionResult UpdateYield(int id, [FromBody] YieldDataDto yieldDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingYield = _dbContext.YieldData.FirstOrDefault(y => y.YieldDataId == id);
                if (existingYield == null)
                {
                    return NotFound($"Yield data with ID {id} not found");
                }

                // Only update fields that can be modified
                existingYield.YieldAmount = yieldDto.YieldAmount;
                existingYield.GrainQuality = yieldDto.GrainQuality;

                // Don't change the harvest date or season as these come from the crop

                _dbContext.SaveChanges();

                return Ok(new
                {
                    message = "Yield data updated successfully",
                    id = existingYield.YieldDataId,
                    harvestDate = existingYield.HarvestDate,
                    season = existingYield.Season
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating yield data");
                return StatusCode(500, $"An error occurred while updating yield data: {ex.Message}");
            }
        }
    }
}
