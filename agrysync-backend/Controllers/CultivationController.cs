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

                var cultivationData = new CultivationData
                {
                    CropId = cultivation.CropId,
                    DateRecorded = cultivation.DateRecorded,
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

                return Ok();
            }
            catch
            {
                return BadRequest();
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
    }
}