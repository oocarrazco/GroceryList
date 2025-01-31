using Microsoft.EntityFrameworkCore;
using ShopDemo2API.Models;

namespace ShopDemo2API.Services
{
    public class ItemService
    {
        private readonly AppDbContext _context;

        public ItemService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Item>> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(int id)
        {
            return await _context.Items.FindAsync(id);
        }

        public async Task AddItem(Item item)
        {
            item.CreatedAt = DateTime.Now;
            item.UpdatedAt = DateTime.Now;
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task<Item?> UpdateItem(int id, Item item)
        {
            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem != null)
            {
                existingItem.Name = item.Name;
                existingItem.Quantity = item.Quantity;
                existingItem.IsPurchased = item.IsPurchased;
                existingItem.UpdatedAt = DateTime.Now;
                await _context.SaveChangesAsync();
            }
            return existingItem;
        }

        public async Task DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
