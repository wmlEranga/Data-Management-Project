using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using agrysync_backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuideController : ControllerBase
    {

        private readonly ILogger<GuideController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public GuideController(ILogger<GuideController> logger, AgrysyncDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        //get guidance by crop id
        [HttpGet("get-guidance/{cropId}")]
        public async Task<IActionResult> GetGuidanceByCropId(int cropId)
        {
            try
            {
                //retrieve cropType data by cropId
                var crop = await _dbContext.Crop.FindAsync(cropId);

                //get duration of crop from planting date to today
                var duration = DateTime.Now - crop.PlantingDate;

                //print duration
                Console.WriteLine(duration.Days);

                //get stage of crop by paddy stages table
                var stage = _dbContext.PaddyStages
                    .Where(s => s.DayRangeStart <= duration.Days && s.DayRangeEnd >= duration.Days && s.RiceType == crop.CropType && s.Variety == crop.Variety)
                    .FirstOrDefault();

                Console.WriteLine(stage.Stage);

                //get all guidances by stage, cropType and variety
                var guidance = _dbContext.StandardGuides
                    .Where(g => g.Stage == stage.Stage && g.CropType == crop.CropType && g.Variety == crop.Variety);


                Console.WriteLine(guidance);

                return Ok(guidance);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting guidance by crop id");
                return StatusCode(500);
            }
        }


    }
}
