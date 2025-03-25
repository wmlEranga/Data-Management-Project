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

        // 1️⃣ Get total number of farmers
        [HttpGet("total-farmers")]
        public async Task<IActionResult> GetTotalFarmers()
        {
            var totalFarmers = await _context.Farmers.CountAsync();
            return Ok(totalFarmers);
        }

        // 2️⃣ Get total number of fields
        [HttpGet("total-fields")]
        public async Task<IActionResult> GetTotalFields()
        {
            var totalFields = await _context.Field.CountAsync();
            return Ok(totalFields);
        }

        // 3️⃣ Get average yield per crop
        [HttpGet("average-yield")]
        public async Task<IActionResult> GetAverageYield()
        {
            var yieldData = await _context.YieldData
                .GroupBy(y => y.CropId)
                .Select(group => new
                {
                    CropId = group.Key,
                    AverageYield = group.Average(y => y.YieldAmount)
                })
                .ToListAsync();

            return Ok(yieldData);
        }

        // 4️⃣ Get common diseases affecting crops
        [HttpGet("common-diseases")]
        public async Task<IActionResult> GetCommonDiseases()
        {
            var diseaseStats = await _context.CultivationData
                .Where(cd => cd.DiseaseId != null)
                .GroupBy(cd => cd.DiseaseId)
                .Select(group => new
                {
                    DiseaseId = group.Key,
                    Occurrences = group.Count()
                })
                .OrderByDescending(d => d.Occurrences)
                .Take(5)
                .ToListAsync();

            return Ok(diseaseStats);
        }

        // 5️⃣ Get fertilizer usage statistics
        public async Task<IActionResult> GetFertilizerUsage()
        {
            var fertilizerUsage = await _context.CultivationData
                .Where(cd => cd.PesticideId != null)
                .GroupBy(cd => cd.PesticideId)
                .Select(group => new
                {
                    PesticideId = group.Key,
                    UsageCount = group.Count()
                })
                .OrderByDescending(f => f.UsageCount)
                .Take(5)
                .ToListAsync();

            return Ok(fertilizerUsage);
        }
    }
}