using System;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Dtos
{
    public class YieldDataDto
    {
        // Optional ID for update operations
        public int? YieldDataId { get; set; }

        [Required(ErrorMessage = "Crop ID is required.")]
        public int CropId { get; set; }

        // HarvestDate is optional and will be populated from the Crop table
        public DateTime? HarvestDate { get; set; }

        [Required(ErrorMessage = "Yield amount is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Yield amount must be a non-negative value.")]
        public int YieldAmount { get; set; }

        [Range(0, 100, ErrorMessage = "Grain quality must be between 0 and 100.")]
        public int GrainQuality { get; set; }

        // Season is optional and will be populated from the Crop table
        public string? Season { get; set; }
    }
}
