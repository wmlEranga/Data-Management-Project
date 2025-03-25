using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Models;
using agrysync_backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public ProfileController(ILogger<ProfileController> logger, AgrysyncDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        // GET: api/Profile?userId=123
        [HttpGet]
        public async Task<IActionResult> GetProfile([FromQuery] int userId)
        {
            // Validate if userId is provided
            if (userId <= 0)
            {
                return BadRequest("Invalid user ID");
            }

            // Fetch the farmer data from the database
            var farmer = await _dbContext.Farmers
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.FarmerId == userId);

            if (farmer == null)
            {
                return NotFound("Farmer not found");
            }

            // Return the farmer data without sensitive information
            return Ok(new
            {
                farmer.FarmerId,
                farmer.FarmerName,
                farmer.FarmerEmail,
                farmer.FarmerAddress,
                farmer.FarmerContact,
                farmer.DateRegistered
            });
        }

        // PUT: api/Profile?userId=123
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromQuery] int userId, [FromBody] Farmer model)
        {
            // Validate if userId is provided
            if (userId <= 0)
            {
                return BadRequest("Invalid user ID");
            }

            // Fetch the farmer from the database
            var farmer = await _dbContext.Farmers.FindAsync(userId);
            if (farmer == null)
            {
                return NotFound("Farmer not found");
            }

            // Update the properties
            farmer.FarmerName = model.FarmerName;
            farmer.FarmerAddress = model.FarmerAddress;
            farmer.FarmerContact = model.FarmerContact;
            // Do not update email or password here

            try
            {
                // Save changes
                await _dbContext.SaveChangesAsync();
                return Ok(new { success = true, message = "Profile updated successfully" });
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error updating profile for farmer {FarmerId}", userId);
                return StatusCode(500, "An error occurred while updating your profile");
            }
        }
    }
}
