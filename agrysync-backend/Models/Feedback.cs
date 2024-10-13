using System;

namespace agrysync_backend.Models
{

    public class Feedback
    {
        // Serial auto-increment primary key
        public int FeedbackId { get; set; }

        public int FarmerId { get; set; }

        public int CropId { get; set; }
        public string FeedbackText { get; set; }
        public DateTime DateRecorded { get; set; }

    }
}