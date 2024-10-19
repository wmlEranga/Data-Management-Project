using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class Farmer
    {
        // Serial auto-increment primary key
        [Key] // Indicates that FarmerId is the primary key
        public int FarmerId { get; set; }

        // Name of the farmer
        [Required(ErrorMessage = "Farmer name is required.")]
        [StringLength(100, ErrorMessage = "Farmer name cannot exceed 100 characters.")]
        public string FarmerName { get; set; }

        // Address of the farmer
        [StringLength(250, ErrorMessage = "Farmer address cannot exceed 250 characters.")]
        public string FarmerAddress { get; set; }

        // Contact number of the farmer
        [StringLength(15, ErrorMessage = "Contact number cannot exceed 15 characters.")]
        public string FarmerContact { get; set; }

        // Email of the farmer
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string FarmerEmail { get; set; }

        // Date when the farmer registered
        [DataType(DataType.Date)] // Optional: specify the data type for better formatting
        public DateTime DateRegistered { get; set; } = DateTime.Now; // Initialize to current date if needed

        // Navigation property for related fields
        public ICollection<Feedback> Feedback { get; set; }
        public virtual ICollection<Field> Fields { get; set; } = new List<Field>(); // Initialize the collection
    }
}
