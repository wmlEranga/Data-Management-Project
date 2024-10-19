using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class Pesticide
    {
        // Serial auto-increment primary key
        [Key] // Indicates that PesticideId is the primary key
        public int PesticideId { get; set; }

        // Name of the pesticide
        [Required(ErrorMessage = "Pesticide name is required.")]
        [MaxLength(100, ErrorMessage = "Pesticide name cannot exceed 100 characters.")]
        public string PesticideName { get; set; }

        // Active ingredient in the pesticide
        [MaxLength(100, ErrorMessage = "Active ingredient cannot exceed 100 characters.")]
        public string ActiveIngredient { get; set; }

        // Method of application
        [MaxLength(200, ErrorMessage = "Application method cannot exceed 200 characters.")]
        public string ApplicationMethod { get; set; }

        // Recommended dosage
        [MaxLength(100, ErrorMessage = "Dosage information cannot exceed 100 characters.")]
        public string Dosage { get; set; }

        // Safety precautions for using the pesticide
        [MaxLength(300, ErrorMessage = "Safety precautions cannot exceed 300 characters.")]
        public string SafetyPrecautions { get; set; }

        // Navigation property for DiseasePesticideMappings
        public virtual ICollection<DiseasePesticideMapping> DiseasePesticideMappings { get; set; }

        // Navigation property for CultivationData
        public virtual ICollection<CultivationData> CultivationData { get; set; }
    }
}
