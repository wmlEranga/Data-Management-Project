// CREATE TABLE paddy_stages (
//     stage_id SERIAL PRIMARY KEY,
//     variety VARCHAR(100) NOT NULL,
//     rice_type VARCHAR(50) NOT NULL, -- e.g., Samba, Nadu, Kekulu
//     stage VARCHAR(100) NOT NULL, -- e.g., Vegetative, Reproductive, Ripening
//     day_range_start INTEGER NOT NULL CHECK (day_range_start >= 0),
//     day_range_end INTEGER NOT NULL CHECK (day_range_end >= day_range_start),
//     total_duration_days INTEGER NOT NULL CHECK (total_duration_days > 0),
//     CONSTRAINT unique_variety_stage UNIQUE (variety, stage) -- Ensures no duplicate stages per variety
// );

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace agrysync_backend.Models
{
    public class PaddyStages
    {
        // Serial auto-increment primary key
        [Key] // Indicates that StageId is the primary key
        public int StageId { get; set; }

        // Variety of the crop (e.g., "IR64")
        [Required(ErrorMessage = "Variety is required.")]
        [MaxLength(100, ErrorMessage = "Variety cannot exceed 100 characters.")]
        public string Variety { get; set; }

        // Type of rice (e.g., "Samba")
        [Required(ErrorMessage = "Rice type is required.")]
        [MaxLength(50, ErrorMessage = "Rice type cannot exceed 50 characters.")]
        public string RiceType { get; set; }

        // Growth stage of the crop (e.g., "Vegetative")
        [Required(ErrorMessage = "Stage is required.")]
        [MaxLength(100, ErrorMessage = "Stage cannot exceed 100 characters.")]
        public string Stage { get; set; }

        // Start day of the growth stage
        [Required(ErrorMessage = "Start day is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Start day must be a positive integer.")]
        public int DayRangeStart { get; set; }

        // End day of the growth stage
        [Required(ErrorMessage = "End day is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "End day must be a positive integer.")]
        public int DayRangeEnd { get; set; }

        // Total duration of the growth stage in days
        [Required(ErrorMessage = "Total duration is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Total duration must be a positive integer.")]
        public int TotalDurationDays { get; set; }


    }
}