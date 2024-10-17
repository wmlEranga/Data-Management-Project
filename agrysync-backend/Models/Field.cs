using System;

namespace agrysync_backend.Models
{

    public class Field
    {
        // Serial auto-increment primary key
        public int FieldId { get; set; }

        public int FarmerId { get; set; }

        public double FieldSize { get; set; }


        public string SoilType { get; set; }

        public string IrrigationType { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public DateTime DateAdded { get; set; }


        public Farmer Farmer { get; set; }

        // Collection of related Crops
        public ICollection<Crop> Crops { get; set; }


        public ICollection<WeatherData> WeatherData { get; set; }

    }
}