using System;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class YieldData
    {
        // Serial auto-increment primary key
        [Key] // Indicates that YieldDataId is the primary key
        public int YieldDataId { get; set; }

        // Foreign key to Crops table
        [Required(ErrorMessage = "Crop ID is required.")]
        public int CropId { get; set; }

        // Date when the yield was recorded
        [Required(ErrorMessage = "Harvest date is required.")]
        public DateTime HarvestDate { get; set; }

        // Amount of yield produced
        [Required(ErrorMessage = "Yield amount is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Yield amount must be a non-negative value.")]
        public int YieldAmount { get; set; }

        // Quality of the grain, consider changing type to an enum for better validation
        [Range(0, 100, ErrorMessage = "Grain quality must be between 0 and 100.")]
        public int GrainQuality { get; set; }

        // Season during which the yield was harvested
        public string Season { get; set; }

        // Navigation property for the related Crop
        public virtual Crop Crop { get; set; }
    }
}
