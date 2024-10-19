using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class Crop
    {
        // Serial auto-increment primary key
        [Key] // Indicates that CropId is the primary key
        public int CropId { get; set; }

        // Foreign key to Fields table
        [ForeignKey("Field")] // Indicates that FieldId is a foreign key
        public int FieldId { get; set; }

        // Type of crop (e.g., "Paddy")
        [Required(ErrorMessage = "Crop type is required.")] // Ensures that CropType cannot be null
        public string CropType { get; set; }

        // Variety of the crop (e.g., "IR64")
        [Required(ErrorMessage = "Variety is required.")] // Ensures that Variety cannot be null
        public string Variety { get; set; }

        // Date when the crop was planted
        [DataType(DataType.Date)] // Optional: Specify the data type for better formatting
        public DateTime PlantingDate { get; set; }

        // Expected harvest date
        [DataType(DataType.Date)] // Optional: Specify the data type for better formatting
        public DateTime ExpectedHarvestDate { get; set; }

        // Season (e.g., 'Yala' or 'Maha')
        [Required(ErrorMessage = "Season is required.")] // Ensures that Season cannot be null
        public string Season { get; set; }

        // Navigation property (Optional, for relationship with Field)
        public virtual Field Field { get; set; } // Make it virtual for lazy loading

        // Navigation properties for related data
        public virtual ICollection<CultivationData> CultivationData { get; set; } = new List<CultivationData>();
        public virtual ICollection<YieldData> YieldData { get; set; } = new List<YieldData>();
        public ICollection<Feedback> Feedback { get; set; }
    }
}
