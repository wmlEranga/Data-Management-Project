using System;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class Feedback
    {
        // Serial auto-increment primary key
        [Key] // Indicates that FeedbackId is the primary key
        public int FeedbackId { get; set; }

        // Foreign key to the Farmer
        public int FarmerId { get; set; }

        // Foreign key to the Crop
        public int CropId { get; set; }

        // Feedback text from the farmer
        [Required] // Ensures that FeedbackText is a required field
        [StringLength(500)] // Optional: Limit the maximum length of FeedbackText
        public string FeedbackText { get; set; }

        // Date when the feedback was recorded
        public DateTime DateRecorded { get; set; }

        // Navigation property for related Farmer
        public virtual Farmer Farmer { get; set; }

        // Navigation property for related Crop
        public virtual Crop Crop { get; set; }
    }
}
