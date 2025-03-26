//controller of paddy disease
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace agrysync_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaddyDiseaseController : ControllerBase
    {
        private readonly ILogger<PaddyDiseaseController> _logger;

        public PaddyDiseaseController(ILogger<PaddyDiseaseController> logger)
        {
            _logger = logger;
        }

        [HttpPost("predict-disease")]
        public async Task<IActionResult> PredictDisease(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            // Check if the directory exists, if not, create it
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var filePath = Path.Combine(uploadPath, file.FileName);

            // Save the file temporarily
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Call Python microservice for prediction
            using (var client = new HttpClient())
            {
                var form = new MultipartFormDataContent();
                form.Add(new ByteArrayContent(System.IO.File.ReadAllBytes(filePath)), "file", file.FileName);

                var response = await client.PostAsync("http://localhost:5001/disease/predict", form);
                if (response.IsSuccessStatusCode)
                {
                    var prediction = await response.Content.ReadAsStringAsync();
                    // Clean the prediction string by removing unwanted characters
                    prediction = prediction.Trim().Replace("\"", "").Replace("\n", "");
                    return Ok(new { Prediction = prediction });
                }
                return StatusCode(500, "Error in prediction service.");
            }
        }
    }
}