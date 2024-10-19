using System;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class GuidanceUpdates
    {
        // Serial auto-increment primary key
        [Key] // Indicates that GuidanceUpdatesId is the primary key
        public int GuidanceUpdatesId { get; set; }

        // Foreign key to the StandardGuides table
        public int GuideId { get; set; }

        // Date when the update was made
        public DateTime DateUpdated { get; set; } = DateTime.Now; // Default to current date and time

        // Updated water level
        [Range(0.0, double.MaxValue, ErrorMessage = "Updated water level must be a non-negative value.")]
        public double UpdatedWaterLevel { get; set; }

        // Recommended water level
        [Range(0.0, double.MaxValue, ErrorMessage = "Recommended water level must be a non-negative value.")]
        public double RecommendedWaterLevel { get; set; }

        // Updated fertilizer information
        [MaxLength(200, ErrorMessage = "Fertilizer information cannot exceed 200 characters.")]
        public string UpdatedFertilizer { get; set; }

        // Updated pesticides information
        [MaxLength(200, ErrorMessage = "Pesticides information cannot exceed 200 characters.")]
        public string UpdatedPesticides { get; set; }

        // Reason for the update
        [MaxLength(500, ErrorMessage = "Reason for update cannot exceed 500 characters.")]
        public string ReasonForUpdate { get; set; }

        // Navigation property for the related StandardGuides
        public virtual StandardGuides StandardGuides { get; set; }
    }
}
