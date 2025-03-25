using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class GrowthStage
    {
        // Serial auto-increment primary key
        [Key] // Indicates that GrowthStageId is the primary key
        public int GrowthStageId { get; set; }

        // Growth stage name (e.g., "Germination")
        [Required(ErrorMessage = "Growth stage name is required.")] // Ensures that GrowthStageName cannot be null
        public string GrowthStageName { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; } = string.Empty; // Make nullable and initialize with empty string

        // Navigation property for related CultivationData
        public ICollection<CultivationData> CultivationData { get; set; }
    }
}