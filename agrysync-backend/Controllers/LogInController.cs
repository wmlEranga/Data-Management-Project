using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Models;
using agrysync_backend.Dtos;
using Microsoft.EntityFrameworkCore;
using agrysync_backend.Data;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInController : ControllerBase
    {
        private readonly ILogger<LogInController> _logger;
        private readonly AgrysyncDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public LogInController(ILogger<LogInController> logger, AgrysyncDbContext dbContext, IConfiguration configuration)
        {
            _logger = logger;
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LogInRequestDto request)
        {
            var storedHashedPassword = await _dbContext.Farmers
                .Where(f => f.FarmerEmail == request.Email)
                .Select(f => f.PasswordHash)
                .FirstOrDefaultAsync();

            if (storedHashedPassword != null && BCrypt.Net.BCrypt.Verify(request.Password, storedHashedPassword))
            {
                var token = GenerateJwtToken();

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddHours(1),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                };
                
                //get user id
                var userId = await _dbContext.Farmers
                    .Where(f => f.FarmerEmail == request.Email)
                    .Select(f => f.FarmerId)
                    .FirstOrDefaultAsync();

                Response.Cookies.Append("jwt", token, cookieOptions);
                return Ok(new { message = "Login successful", userId = userId });
            }

            return Unauthorized();
        }

        private string GenerateJwtToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, "userId") }), // Consider using the actual userId here
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        [HttpGet("check-auth")]
        public IActionResult CheckAuth()
        {
            var jwt = Request.Cookies["jwt"];
            if (string.IsNullOrEmpty(jwt))
            {
                return Unauthorized();
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"]);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return Ok();
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear the JWT cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(-1), // Set an expiration in the past
                SameSite = SameSiteMode.Strict,
                Secure = true
            };

            Response.Cookies.Append("jwt", "", cookieOptions); // Clear the cookie by setting an empty value
            return Ok(new { message = "Logged out successfully" });
        }


    }


}
