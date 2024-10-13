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

            var filePath = Path.Combine("Uploads", file.FileName);

            // Save file temporarily
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Call Python microservice for prediction
            using (var client = new HttpClient())
            {
                var form = new MultipartFormDataContent();
                form.Add(new ByteArrayContent(System.IO.File.ReadAllBytes(filePath)), "file", file.FileName);

                var response = await client.PostAsync("http://localhost:5000/predict", form);
                if (response.IsSuccessStatusCode)
                {
                    var prediction = await response.Content.ReadAsStringAsync();
                    return Ok(new { Prediction = prediction });
                }
                return StatusCode(500, "Error in prediction service.");
            }
        }

    }
}