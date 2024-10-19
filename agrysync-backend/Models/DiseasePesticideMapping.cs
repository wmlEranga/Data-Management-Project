using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class DiseasePesticideMapping
    {
        // Serial auto-increment primary key
        [Key] // Indicates that DiseasePesticideMappingId is the primary key
        public int DiseasePesticideMappingId { get; set; }

        // Foreign key to Diseases table
        [ForeignKey("Disease")] // Indicates that DiseaseId is a foreign key
        public int DiseaseId { get; set; }

        // Foreign key to Pesticides table
        [ForeignKey("Pesticide")] // Indicates that PesticideId is a foreign key
        public int PesticideId { get; set; }

        // Navigation property (Optional, for relationship with Disease)
        public virtual Disease Disease { get; set; }

        // Navigation property (Optional, for relationship with Pesticide)
        public virtual Pesticide Pesticide { get; set; }
    }
}
