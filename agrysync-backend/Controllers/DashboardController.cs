using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using agrysync_backend.Models;
using agrysync_backend.Data;


namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AgrysyncDbContext _context;

        public DashboardController(AgrysyncDbContext context)
        {
            _context = context;
        }

        //count farms worked these days` from all farmers
        [HttpGet("farm-statistics")]
        public async Task<IActionResult> GetFarmStatistics()
        {
            var recentDate = DateTime.UtcNow.AddDays(-120); // Adjust the number of days as needed

            // Count of all farms
            var totalFarms = await _context.Field
            .Select(f => f.Farmer)
            .Distinct()
            .CountAsync();

            // Count of farms worked in the recent days
            var recentFarms = await _context.Crop
            .Where(c => c.PlantingDate >= recentDate)
            .Select(c => c.Field.Farmer)
            .Distinct()
            .CountAsync();

            return Ok(new { TotalFarms = totalFarms, RecentFarms = recentFarms });
        }

        // 2️⃣ Latest Weather Data per Field
        [HttpGet("weather")]
        public async Task<IActionResult> GetLatestWeatherData()
        {
            var weatherData = await _context.Field
                .Include(f => f.WeatherData)
                .Select(f => new
                {
                    FieldName = f.FieldName,
                    Latitude = f.Latitude,
                    Longitude = f.Longitude,
                    WeatherData = f.WeatherData.OrderByDescending(w => w.DateRecorded).FirstOrDefault()
                })
                .ToListAsync();

            return Ok(weatherData);
        }

        // 3️⃣ Yield Trends: Get historical yield data per crop
        [HttpGet("yield-trends")]
        public async Task<IActionResult> GetYieldTrends()
        {
            var yieldTrends = await _context.YieldData
                .Include(y => y.Crop)
                .GroupBy(y => new { y.Crop.CropType, y.Crop.Variety })
                .Select(g => new
                {
                    CropName = g.Key.CropType + " - " + g.Key.Variety,
                    AverageYield = g.Average(y => y.YieldAmount),
                    MinYield = g.Min(y => y.YieldAmount),
                    MaxYield = g.Max(y => y.YieldAmount)
                })
                .ToListAsync();

            return Ok(yieldTrends);
        }

        // 4️⃣ Fertilizer Usage Trends
        [HttpGet("fertilizer-usage")]
        public async Task<IActionResult> GetFertilizerUsage()
        {
            var fertilizerUsage = await _context.CultivationData
                .Where(c => c.PesticideId != null)
                .GroupBy(c => c.Pesticide.PesticideName)
                .Select(g => new
                {
                    Fertilizer = g.Key,
                    UsageCount = g.Count()
                })
                .ToListAsync();

            return Ok(fertilizerUsage);
        }

        //

    }
}