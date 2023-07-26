using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyBand.Models
{
    public class BandUserRequest
    {
        public int id { get; set; }

        public int userId { get; set; }

        public int bandId { get; set; }

        public int roleId { get; set; }

        public bool isLeader { get; set; }

        public bool isAccepted{ get; set; }

        [Required]
        [MaxLength(225)]
        public string note { get; set; }


        public bool sentByBand { get; set; }

    }
}

