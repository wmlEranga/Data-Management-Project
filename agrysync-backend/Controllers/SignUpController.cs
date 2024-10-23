using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Models; // Ensure this namespace contains your Farmer model
using agrysync_backend.Dtos; // Ensure this namespace contains your SignUpRequestDto
using Microsoft.EntityFrameworkCore;
using agrysync_backend.Data;
using BCrypt.Net; // Add this line to include the BCrypt namespace

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SignUpController : ControllerBase
    {
        private readonly ILogger<SignUpController> _logger;
        private readonly AgrysyncDbContext _dbContext; // Your DbContext for accessing the database

        public SignUpController(ILogger<SignUpController> logger, AgrysyncDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext; // Initialize your DbContext
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto request)
        {
            // Check if user already exists
            var existingUser = await _dbContext.Farmers.SingleOrDefaultAsync(u => u.FarmerEmail == request.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // Hash the password (never store plain passwords)
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            // Create a new Farmer object and save it to the database
            var newUser = new Farmer // Ensure your Farmer model has these properties
            {

                FarmerEmail = request.Email,
                PasswordHash = passwordHash,
                DateRegistered = DateTime.UtcNow // Optional: set the registration date
            };

            // Add the new user to the database
            _dbContext.Farmers.Add(newUser);
            await _dbContext.SaveChangesAsync(); // Save changes to the database

            // Return a success response
            // Return a success response
            return Ok(new { success = true, message = "User signed up successfully." });
        }
    }
}
