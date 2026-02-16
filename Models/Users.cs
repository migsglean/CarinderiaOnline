using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetProject.Models
{
    public class Users
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string studentId { get; set; }
        public string password { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public string gender { get; set; }
        public string emailAddress { get; set; } 
        public string phoneNumber { get; set; }
        public string streetAddress { get; set; }
        public string city { get; set; }
        public string barangay { get; set; }
        public int zipCode { get; set; }

    }
}
