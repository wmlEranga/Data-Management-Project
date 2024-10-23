using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class Field
    {
        // Serial auto-increment primary key
        [Key] // Indicates that FieldId is the primary key
        public int FieldId { get; set; }

        // Name of the field
        [Required] // Ensures that FieldName is a required field
        public string FieldName { get; set; }

        // Foreign key to the Farmer
        public int FarmerId { get; set; }

        // Size of the field in acres/hectares (consider specifying units)
        [Range(0.1, double.MaxValue, ErrorMessage = "Field size must be greater than zero.")]
        public double FieldSize { get; set; }

        // Type of soil in the field
        [Required] // Ensures that SoilType is a required field
        public string SoilType { get; set; }

        // Type of irrigation used
        [Required] // Ensures that IrrigationType is a required field
        public string IrrigationType { get; set; }

        // Geographic coordinates
        [Range(-90.0, 90.0, ErrorMessage = "Latitude must be between -90 and 90.")]
        public double Latitude { get; set; }

        [Range(-180.0, 180.0, ErrorMessage = "Longitude must be between -180 and 180.")]
        public double Longitude { get; set; }

        // Date when the field was added
        public DateTime DateAdded { get; set; } = DateTime.Now; // Default to current date and time

        // Navigation property for related Farmer
        public virtual Farmer Farmer { get; set; }

        // Collection of related Crops
        public virtual ICollection<Crop> Crops { get; set; } = new List<Crop>();

        // Collection of related WeatherData
        public virtual ICollection<WeatherData> WeatherData { get; set; } = new List<WeatherData>();
    }
}
