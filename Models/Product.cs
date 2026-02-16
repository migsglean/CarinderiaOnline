using System.ComponentModel.DataAnnotations;

namespace PetProject.Models
{
    public class Product
    {
        [Key]
        public int id { get; set; }
        public string productName { get; set; }
        public string productDescription { get; set; }
        public string productType { get; set; }
        public int productPrice { get; set; }
        public string productCode { get; set; }
        public string? productCategory { get; set; }
    }
}
