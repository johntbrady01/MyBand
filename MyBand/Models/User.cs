using System;
using System.ComponentModel.DataAnnotations;

namespace MyBand.Models
{
	public class User
	{
        public int id { get; set; }

        [Required]
        [MaxLength(225)]
        public string username { get; set; }

        [Required]
        [MaxLength(225)]
        public string email { get; set; }


        public string firebaseId { get; set; }

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
        public string skills { get; set; }


    }
}

