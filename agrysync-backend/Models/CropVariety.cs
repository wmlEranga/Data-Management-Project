using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace agrysync_backend.Models
{
    public class CropVariety
    {
        // Serial auto-increment primary key
        [Key] // Indicates that CropVarietyId is the primary key
        public int CropVarietyId { get; set; }

        // Foreign key to CropType table
        [ForeignKey("CropType")] // Indicates that CropTypeId is a foreign key
        public int CropTypeId { get; set; }

        // Variety of the crop (e.g., "IR64")
        [Required(ErrorMessage = "Variety is required.")] // Ensures that Variety cannot be null
        public string Variety { get; set; }

        //Harvest duration in days
        [Required(ErrorMessage = "Harvest duration is required.")] // Ensures that HarvestDuration cannot be null
        public float HarvestDuration { get; set; }

        // Navigation property (Optional, for relationship with CropType)
        [JsonIgnore]
        public virtual CropType CropType { get; set; } // Make it virtual for lazy loading
    }
}