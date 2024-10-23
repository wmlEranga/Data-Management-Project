using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace agrysync_backend.Dtos
{
    public class ProjectDto
    {
        public String fieldName { get; set; }
        public float fieldSize { get; set; }

        public String soilType { get; set; }
        public String irrigationType { get; set; }

        public float latitude { get; set; }
        public float longitude { get; set; }
        public DateTime cropPlantingDate { get; set; }
        public DateTime expectedHarvestDate { get; set; }
        public String cropType { get; set; }
        public String cropVariety { get; set; }
        public int farmerId { get; set; }

    }
}
