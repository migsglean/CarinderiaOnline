using System.ComponentModel.DataAnnotations;

namespace PetProject.Models
{
    public class Image
    {
        [Key]
        public int id { get; set; }
        public string? fileName { get; set; }
        public string? filePath { get; set; }

        public int? productId { get; set; }

    }
}
