using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class Disease
    {
        // Serial auto-increment primary key
        [Key] // Indicates that DiseaseId is the primary key
        public int DiseaseId { get; set; }

        // Name of the disease
        [Required] // Ensures that DiseaseName is a required field
        public string DiseaseName { get; set; }

        // Description of the disease
        public string Description { get; set; }

        // Symptoms of the disease
        public string Symptoms { get; set; }

        // Navigation property for DiseasePesticideMappings
        public virtual ICollection<DiseasePesticideMapping> DiseasePesticideMappings { get; set; } = new List<DiseasePesticideMapping>();

        // Navigation property for CultivationData
        public virtual ICollection<CultivationData> CultivationData { get; set; } = new List<CultivationData>();
    }
}
