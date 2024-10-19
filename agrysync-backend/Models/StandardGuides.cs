using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class StandardGuides
    {
        // Serial auto-increment primary key
        [Key] // Indicates that GuideId is the primary key
        public int GuideId { get; set; }

        // Type of crop (e.g., "Paddy")
        [Required(ErrorMessage = "Crop type is required.")]
        [MaxLength(100, ErrorMessage = "Crop type cannot exceed 100 characters.")]
        public string CropType { get; set; }

        // Variety of the crop (e.g., "IR64")
        [MaxLength(100, ErrorMessage = "Variety cannot exceed 100 characters.")]
        public string Variety { get; set; }

        // Growth stage of the crop (e.g., "Vegetative")
        [Required(ErrorMessage = "Stage is required.")]
        [MaxLength(100, ErrorMessage = "Stage cannot exceed 100 characters.")]
        public string Stage { get; set; }

        // Recommended water level in centimeters
        [Range(0, 100, ErrorMessage = "Recommended water level must be between 0 and 100.")]
        public double RecommendedWaterLevel { get; set; }

        // Recommended fertilizer information
        [MaxLength(200, ErrorMessage = "Recommended fertilizer cannot exceed 200 characters.")]
        public string RecommendedFertilizer { get; set; }

        // Recommended pesticides information
        [MaxLength(200, ErrorMessage = "Recommended pesticides cannot exceed 200 characters.")]
        public string RecommendedPesticides { get; set; }

        // Additional notes for the guide
        [MaxLength(500, ErrorMessage = "Notes cannot exceed 500 characters.")]
        public string Notes { get; set; }

        // Navigation property for GuidanceUpdates
        public virtual ICollection<GuidanceUpdates> GuidanceUpdates { get; set; }
    }
}
