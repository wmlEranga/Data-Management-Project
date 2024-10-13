using System;

namespace agrysync_backend.Models
{

    public class WeatherData
    {
        // Serial auto-increment primary key
        public int WeatherDataId { get; set; }

        public int FieldId { get; set; }

        public DateTime DateRecorded { get; set; }

        public double Temperature { get; set; }

        public double Humidity { get; set; }

        public double Rainfall { get; set; }

        public double WindSpeed { get; set; }

        public Field Field { get; set; }

    }
}