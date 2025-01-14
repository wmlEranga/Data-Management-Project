using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class CultivationData
    {
        // Serial auto-increment primary key
        [Key] // Indicates that CultivationDataId is the primary key
        public int CultivationDataId { get; set; }

        // Foreign key to Crop table
        [ForeignKey("Crop")] // Indicates that CropId is a foreign key
        public int CropId { get; set; }

        // Date when data was recorded
        [Required(ErrorMessage = "Date recorded is required.")] // Ensures that DateRecorded cannot be null
        public DateTime DateRecorded { get; set; }

        // Growth stage of the crop
        [ForeignKey("GrowthStage")]
        [Required]
        public int GrowthStageId { get; set; } // Foreign key to GrowthStage table

        [ForeignKey("WaterLevel")]
        [Required]
        public int WaterLevelId { get; set; } // Foreign key to WaterLevel table

        // Fertilizer used
        [StringLength(100)] // Optional: Limit the maximum length of FertilizerUsed
        public string? FertilizerUsed { get; set; }

        // Pesticide used
        [StringLength(100)] // Optional: Limit the maximum length of PesticideUsed
        public string? PesticideUsed { get; set; }

        // Report on any disease
        [StringLength(500)] // Optional: Limit the maximum length of DiseaseReport
        public string? DiseaseReport { get; set; }

        // Foreign key to Disease table
        [ForeignKey("Disease")] // Indicates that DiseaseId is a foreign key
        public int? DiseaseId { get; set; }

        // Foreign key to Pesticide table
        [ForeignKey("Pesticide")] // Indicates that PesticideId is a foreign key
        public int? PesticideId { get; set; }

        // Navigation property for related Crop
        public virtual Crop Crop { get; set; }
        public virtual GrowthStage GrowthStage { get; set; }
        public virtual WaterLevel WaterLevel { get; set; }

        // Navigation property for related Disease
        public virtual Disease Disease { get; set; }

        // Navigation property for related Pesticide
        public virtual Pesticide Pesticide { get; set; }
    }
}
