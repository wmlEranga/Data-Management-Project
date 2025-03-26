using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using agrysync_backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FarmerDashboardController : ControllerBase
    {
        private readonly AgrysyncDbContext _context;

        public FarmerDashboardController(AgrysyncDbContext context)
        {
            _context = context;
        }

        // 6️⃣ Get crop distribution by field area
        [HttpGet("crop-distribution")]
        public async Task<IActionResult> GetCropDistribution()
        {
            var cropDistribution = await _context.Crop
                .GroupBy(c => c.CropType)
                .Select(group => new
                {
                    CropType = group.Key,
                    TotalArea = group.Sum(c => c.Field.FieldSize),
                    FieldCount = group.Count()
                })
                .OrderByDescending(c => c.TotalArea)
                .Take(8)
                .ToListAsync();

            return Ok(cropDistribution);
        }

        // 7️⃣ Get seasonal yield analysis
        [HttpGet("seasonal-yield")]
        public async Task<IActionResult> GetSeasonalYield()
        {
            var seasonalYield = await _context.YieldData
                .Where(y => y.Crop != null)
                .GroupBy(y => new
                {
                    Season = y.Crop.Season,  // Use actual Season from Crop table
                    CropType = y.Crop.CropType
                })
                .Select(group => new
                {
                    Season = group.Key.Season,
                    CropType = group.Key.CropType,
                    AverageYield = group.Average(y => y.YieldAmount)
                })
                .OrderBy(s => s.Season)
                .ToListAsync();

            return Ok(seasonalYield);
        }

        // Get count of yield by season (Yala and Maha)
        [HttpGet("season-yield-count")]
        public async Task<IActionResult> GetSeasonYieldCount()
        {
            var seasonYieldCount = await _context.YieldData
                .Where(y => y.Crop != null)
                .GroupBy(y => y.Crop.Season)
                .Select(group => new
                {
                    Season = group.Key,
                    YieldCount = group.Count(),
                    TotalYield = group.Sum(y => y.YieldAmount)
                })
                .OrderByDescending(s => s.YieldCount)
                .ToListAsync();

            return Ok(seasonYieldCount);
        }

        // Get crop success rate - compares actual yields against expected yields
        [HttpGet("crop-success-rate")]
        public async Task<IActionResult> GetCropSuccessRate()
        {
            // Calculate success rate as (actual yield / expected yield) * 100
            var successRates = await _context.Crop
                .Where(c => c.YieldData.Any())
                .GroupBy(c => c.CropType)
                .Select(group => new
                {
                    CropType = group.Key,
                    SuccessRate = group.Average(c =>
                        c.YieldData.Sum(y => y.YieldAmount) /
                        (c.Field.FieldSize * 4531) * 100), // Using 4531 units per hectare as ideal
                    CropCount = group.Count()
                })
                .OrderByDescending(s => s.SuccessRate)
                .ToListAsync();

            return Ok(successRates);
        }

        // Get farmer productivity comparison
        [HttpGet("farmer-productivity")]
        public async Task<IActionResult> GetFarmerProductivity()
        {
            var farmerProductivity = await _context.Farmers
                .Where(f => f.Fields.Any(field => field.Crops.Any(c => c.YieldData.Any())))
                .Select(farmer => new
                {
                    FarmerName = farmer.FarmerName,
                    TotalFields = farmer.Fields.Count(),
                    TotalCrops = farmer.Fields.Sum(f => f.Crops.Count()),
                    AverageYield = farmer.Fields
                        .SelectMany(f => f.Crops)
                        .SelectMany(c => c.YieldData)
                        .Average(y => y.YieldAmount),
                    TotalArea = farmer.Fields.Sum(f => f.FieldSize)
                })
                .OrderByDescending(f => f.AverageYield / f.TotalArea)
                .Take(10)
                .ToListAsync();

            return Ok(farmerProductivity);
        }
    }
}