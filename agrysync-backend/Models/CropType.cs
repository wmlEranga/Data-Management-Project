//croptype and  cropvariety list
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace agrysync_backend.Models
{
    public class CropType
    {
        // Serial auto-increment primary key
        [Key] // Indicates that CropTypeId is the primary key
        public int CropTypeId { get; set; }

        // Type of crop (e.g., "Paddy")
        [Required(ErrorMessage = "Crop type is required.")] // Ensures that CropType cannot be null
        public string CropTypeName { get; set; } = string.Empty;

        // Navigation properties for related data
        public virtual ICollection<CropVariety> CropVarieties { get; set; } = new List<CropVariety>();
    }
}