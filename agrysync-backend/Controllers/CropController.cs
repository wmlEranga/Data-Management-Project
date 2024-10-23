using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using agrysync_backend.Models;
using agrysync_backend.Dtos;
using Microsoft.EntityFrameworkCore;
using agrysync_backend.Data;
using BCrypt.Net;
using agrysync_backend.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CropController : ControllerBase
    {
        private readonly ILogger<CropController> _logger;
        private readonly AgrysyncDbContext _dbContext;

        public CropController(ILogger<CropController> logger, AgrysyncDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        //get crop types list with crop Varieties list
        [HttpGet]
        [Route("GetCropTypes")]
        public ActionResult<IEnumerable<CropType>> GetCropTypesWithVarieties()
        {
            var cropTypes = _dbContext.CropTypes.Include(ct => ct.CropVarieties).ToList();
            return Ok(cropTypes);
        }



    }
}