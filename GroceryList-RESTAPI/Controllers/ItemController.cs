using ShopDemo2API.Models;
using ShopDemo2API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ShopDemo2API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemController(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetAllItems()
        {
            var items = await _itemService.GetAllItems();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItemById(int id)
        {
            var item = await _itemService.GetItemById(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> CreateItem([FromBody] Item item)
        {
            await _itemService.AddItem(item);
            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(int id, [FromBody] Item item)
        {
            var updatedItem = await _itemService.UpdateItem(id, item);
            if (updatedItem == null)
            {
                return NotFound();
            }

            return Ok(new { id = updatedItem.Id, item = updatedItem });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            var existingItem = await _itemService.GetItemById(id);
            if (existingItem == null)
            {
                return NotFound();
            }

            await _itemService.DeleteItem(id);
            return NoContent();
        }

        [HttpPatch("{id}/toggle-purchase")]
        public async Task<ActionResult> TogglePurchaseStatus(int id, [FromBody] TogglePurchaseRequest request)
        {
            var existingItem = await _itemService.GetItemById(id);

            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.IsPurchased = request.IsPurchased;
            existingItem.UpdatedAt = DateTime.Now;
            await _itemService.UpdateItem(id, existingItem);

            return Ok(new { id = existingItem.Id, isPurchased = existingItem.IsPurchased });
        }

        public class TogglePurchaseRequest
        {
            public bool IsPurchased { get; set; }
        }
    }
}
