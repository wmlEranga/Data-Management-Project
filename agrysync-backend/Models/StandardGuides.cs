namespace agrysync_backend.Models
{

    public class StandardGuides
    {

        // Serial auto-increment primary key
        public int GuideId { get; set; }

        public string CropType { get; set; }

        public string Variety { get; set; }

        public string Stage { get; set; }

        public double recommendedWaterLevel { get; set; }

        public string recommendedFertilizer { get; set; }

        public string recommendedPesticides { get; set; }

        public string notes { get; set; }

        public ICollection<GuidanceUpdates> GuidanceUpdates { get; set; }

    }

}