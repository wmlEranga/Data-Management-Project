using System;

namespace agrysync_backend.Models
{

    public class GuidanceUpdates

    {
        // Serial auto-increment primary key
        public int GuidanceUpdatesId { get; set; }

        public int GuideId { get; set; }

        public DateTime DateUpdated { get; set; }

        public double UpdatedWaterLevel { get; set; }

        public double recommendedWaterLevel { get; set; }

        public string UpdatedFertilizer { get; set; }

        public string UpdatedPesticides { get; set; }

        public string ReasonForUpdate { get; set; }

        public StandardGuides StandardGuides { get; set; }

    }

}

