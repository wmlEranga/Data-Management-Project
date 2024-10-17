using System;

namespace agrysync_backend.Models
{

    public class Disease
    {
        // Serial auto-increment primary key
        public int DiseaseId { get; set; }

        public string DiseaseName { get; set; }

        public string Description { get; set; }

        public string Symptoms { get; set; }

        // Navigation property for DiseasePesticideMappings

        public ICollection<DiseasePesticideMapping> DiseasePesticideMappings { get; set; }

        public ICollection<CultivationData> CultivationData { get; set; }
    }

}

