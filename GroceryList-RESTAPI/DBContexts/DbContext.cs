using Microsoft.EntityFrameworkCore;

namespace ShopDemo2API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Item> Items { get; set; }
    }
}
