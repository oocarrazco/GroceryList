using System.ComponentModel.DataAnnotations;

namespace ShopDemo2API.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "This field is required")]
        [StringLength(128)]
        public required string Name { get; set; }
        public int Quantity { get; set; }
        public bool IsPurchased { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
