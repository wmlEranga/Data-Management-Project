using System;

namespace agrysync_backend.Models
{
    public class Crop
    {
        // Serial auto-increment primary key
        public int CropId { get; set; }

        // Foreign key to Fields table
        public int FieldId { get; set; }

        // Type of crop (e.g., "Paddy")
        public string CropType { get; set; }

        // Variety of the crop (e.g., "IR64")
        public string Variety { get; set; }

        // Date when the crop was planted
        public DateTime PlantingDate { get; set; }

        // Expected harvest date
        public DateTime ExpectedHarvestDate { get; set; }

        // Season (e.g., 'Yala' or 'Maha')
        public string Season { get; set; }

        // Navigation property (Optional, for relationship with Field)
        public Field Field { get; set; }
    }
}
