using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Dtos
{
    public class CultivationDto
    {
        [Required]
        public int CropId { get; set; }

        [Required(ErrorMessage = "Date recorded is required.")]
        public DateTime DateRecorded { get; set; }

        [Required(ErrorMessage = "Growth stage is required.")]
        [StringLength(100)]
        public int GrowthStageId { get; set; }

        [Required(ErrorMessage = "Water level is required.")]
        public int WaterLevelId { get; set; }

        [StringLength(100)]
        public string? FertilizerUsed { get; set; }

        [StringLength(100)]
        public string? PesticideUsed { get; set; }

        [StringLength(500)]
        public string? DiseaseReport { get; set; }

        public int? DiseaseId { get; set; }

        public int? PesticideId { get; set; }
    }
}