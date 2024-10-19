using System;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class WeatherData
    {
        // Serial auto-increment primary key
        [Key] // Indicates that WeatherDataId is the primary key
        public int WeatherDataId { get; set; }

        // Foreign key to Fields table
        [Required(ErrorMessage = "Field ID is required.")]
        public int FieldId { get; set; }

        // Date when the weather data was recorded
        [Required(ErrorMessage = "Date recorded is required.")]
        public DateTime DateRecorded { get; set; }

        // Temperature in degrees Celsius
        [Range(-50, 60, ErrorMessage = "Temperature must be between -50 and 60 degrees Celsius.")]
        public double Temperature { get; set; }

        // Humidity as a percentage
        [Range(0, 100, ErrorMessage = "Humidity must be between 0 and 100 percent.")]
        public double Humidity { get; set; }

        // Rainfall in millimeters
        [Range(0, 1000, ErrorMessage = "Rainfall must be between 0 and 1000 millimeters.")]
        public double Rainfall { get; set; }

        // Wind speed in kilometers per hour
        [Range(0, 200, ErrorMessage = "Wind speed must be between 0 and 200 kilometers per hour.")]
        public double WindSpeed { get; set; }

        // Navigation property for the related Field
        public virtual Field Field { get; set; }
    }
}
