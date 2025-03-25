using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class WaterLevel
    {
        // Serial auto-increment primary key
        [Key] // Indicates that WaterLevelId is the primary key
        public int WaterLevelId { get; set; }

        // Water level (e.g., "High")
        [Required(ErrorMessage = "Water level is required.")] // Ensures that WaterLevelName cannot be null
        public string WaterLevelName { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; } = string.Empty; // Make nullable and initialize with empty string

        // Navigation property for related CultivationData
        public ICollection<CultivationData> CultivationData { get; set; }
    }
}