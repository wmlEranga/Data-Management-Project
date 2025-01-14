using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Dtos
{
    public class ProjectDto
    {
        [Required]
        public String fieldName { get; set; }

        [Required]
        public float fieldSize { get; set; }

        [Required]
        public String soilType { get; set; }

        [Required]
        public String irrigationType { get; set; }

        [Required]
        public float latitude { get; set; }

        [Required]
        public float longitude { get; set; }

        [Required]
        public DateTime cropPlantingDate { get; set; }

        [Required]
        public DateTime expectedHarvestDate { get; set; }

        [Required]
        public String cropType { get; set; }

        [Required]
        public String cropVariety { get; set; }

        [Required]
        public String season { get; set; }

        [Required]
        public int farmerId { get; set; }
    }
}
