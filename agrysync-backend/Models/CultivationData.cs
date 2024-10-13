using System;

namespace agrysync_backend.Models
{
    public class CultivationData
    {

        // Serial auto-increment primary key
        public int CultivationDataId { get; set; }

        // Foreign key to crop table
        public int CropId { get; set; }

        public DateTime DateRecorded { get; set; }
        public string GrowthStage { get; set; }
        public string WaterLevel { get; set; }
        public string FertilizerUsed { get; set; }
        public string PesticideUsed { get; set; }
        public string DiseaseReport { get; set; }
        public int DiseaseId { get; set; }
        public int PesticideId { get; set; }

        public Crop Crop { get; set; }

        public Disease Disease { get; set; }

        public Pesticide Pesticide { get; set; }
    }

}