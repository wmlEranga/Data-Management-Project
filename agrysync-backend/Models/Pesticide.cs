using System;

namespace agrysync_backend.Models
{

    public class Pesticide
    {
        // Serial auto-increment primary key
        public int PesticideId { get; set; }

        public string PesticideName { get; set; }

        public string ActiveIngredient { get; set; }

        public string ApplicationMethod { get; set; }
        public string Dosage { get; set; }
        public string safetyPrecautions { get; set; }

    }

}
