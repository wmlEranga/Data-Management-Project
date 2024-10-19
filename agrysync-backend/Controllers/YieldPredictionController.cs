//controller of paddy disease
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.IO;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace agrysync_backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class YieldPredictionController : ControllerBase
    {
        private readonly ILogger<YieldPredictionController> _logger;

        public YieldPredictionController(ILogger<YieldPredictionController> logger)
        {
            _logger = logger;
        }


        // POST /yield-prediction/
        //eg payload:  {"CropType": "Wheat","Variety": "444","Season": "Yala","GrowthStage": "Seedling","WaterLevel": "Low","FertilizerUsed": "4444","Temperature": "9","Humidity": "9","Rainfall": "9"}
        [HttpPost("predict-yield")]
        public async Task<IActionResult> PredictYield([FromBody] YieldPredictionRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request.");

            try
            {
                // Call Python microservice for prediction
                using (var client = new HttpClient())
                {
                    // Create JSON content for the request
                    var jsonContent = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

                    // Post the JSON content to the Flask API
                    var response = await client.PostAsync("http://127.0.0.1:5000/predict", jsonContent);
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
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while predicting yield.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
    }

    public class YieldPredictionRequest
    {
        public string CropType { get; set; }
        public string Variety { get; set; }
        public string Season { get; set; }
        public string GrowthStage { get; set; }
        public string WaterLevel { get; set; }
        public string FertilizerUsed { get; set; }
        public string Temperature { get; set; }
        public string Humidity { get; set; }
        public string Rainfall { get; set; }
    }
}

