using System;

namespace agrysync_backend.Models
{

    public class Farmer
    {
        // Serial auto-increment primary key
        public int FarmerId { get; set; }

        public string FarmerName { get; set; }

        public string FarmerAddress { get; set; }

        public string FarmerContact { get; set; }

        public string FarmerEmail { get; set; }

        public DateTime DateRegistered { get; set; }

    }

}