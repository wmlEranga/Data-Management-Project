using System;

namespace agrysync_backend.Models
{

    public class DiseasePesticideMapping
    {
        // Serial auto-increment primary key
        public int DiseasePesticideMappingId { get; set; }

        // Foreign key to Diseases table
        public int DiseaseId { get; set; }

        // Foreign key to Pesticides table
        public int PesticideId { get; set; }

        // Navigation property (Optional, for relationship with Disease)
        public Disease Disease { get; set; }

        // Navigation property (Optional, for relationship with Pesticide)
        public Pesticide Pesticide { get; set; }
    }

}