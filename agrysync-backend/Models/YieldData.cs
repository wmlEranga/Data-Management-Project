using System;

namespace agrysync_backend.Models
{

    public class YieldData
    {
        // Serial auto-increment primary key
        public int YieldDataId { get; set; }

        public int CropId { get; set; }

        public int HarvestDate { get; set; }

        public int YieldAmount { get; set; }

        public int grainQuality { get; set; }

        public string Season { get; set; }

        public Crop Crop { get; set; }

    }

}