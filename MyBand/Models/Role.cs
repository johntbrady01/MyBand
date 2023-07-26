using System;
using System.ComponentModel.DataAnnotations;

namespace MyBand.Models
{
	public class Role
	{
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string name { get; set; }
    }
}

