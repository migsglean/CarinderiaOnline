using System.ComponentModel.DataAnnotations;

namespace PetProject.Models
{
    public class Order
    {
        [Key]
        public int? orderId { get; set; }
        public int? semiAmount { get; set; }
        public string? status { get; set; }
        public int? productId { get; set; }
        public string? studentId { get; set; }
        public DateTime? createdAt { get; set; }

    }
}   
