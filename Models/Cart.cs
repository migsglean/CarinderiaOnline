using System.ComponentModel.DataAnnotations;

namespace PetProject.Models
{
    public class Cart
    {
        [Key] 
        public int? cartId { get; set; }
        public int? quantity { get; set; }
        public string? status { get; set; }
        public string? studentId { get; set; }
        public int? productId { get; set; }
        public DateTime? createAt { get; set; }
    }       
}
