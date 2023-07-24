using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyBand.Models
{
	public class Band
	{
        public int id { get; set; }

        [Required]
        [MaxLength(225)]
        public string name { get; set; }

        [Required]
        [MaxLength(225)]
        public string bio { get; set; }

        [Required]
        [MaxLength(225)]
        public string profilePic { get; set; }

        [Required]
        [MaxLength(225)]
        public string genres { get; set; }

        [Required]
        [MaxLength(225)]
        public string searchingFor { get; set; }

        public List<User> users { get; set; }
    }
}

