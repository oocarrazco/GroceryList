
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceryService } from './services/grocery.service';
import { GroceryItem } from './models/grocery-item.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class GroceryListComponent implements OnInit {
  groceryItems: GroceryItem[] = [];
  newItem: Partial<GroceryItem> = {
    name: '',
    quantity: 1,
    isPurchased: false
  };

  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    this.loadGroceryItems();
  }

  loadGroceryItems(): void {
    this.groceryService.getGroceryItems().subscribe({
      next: (items) => {
        this.groceryItems = items.filter(item => item != null);
      },
      error: (error) => console.error('Error loading grocery items:', error)
    });
  }

  addItem(): void {
    if (!this.newItem.name?.trim()) {
      alert('Please enter a valid name for the item.');
      return;
    }
  
    // Validate quantity
    if ( this.newItem.quantity == null || 
      !Number.isInteger(this.newItem.quantity) || 
      this.newItem.quantity <= 0 ) {
      alert('Please enter the amount you need to buy.');
      return;
    }
  
    // Check for existing item with the same name (case insensitive)
    const existingItem = this.groceryItems.find(
      item => item.name.toLowerCase() === this.newItem.name?.toLowerCase()
    );
  
    if (existingItem) {
      if (confirm(`"${existingItem.name}" already exists. Would you like to update its quantity instead?`)) {
        
        // Update existing item's quantity
        this.groceryService.updateGroceryItem({
          id: existingItem.id,
          item: {
            name: existingItem.name,
            quantity: existingItem.quantity + (this.newItem.quantity || 1),
            isPurchased: existingItem.isPurchased,
          }
        }).subscribe({
          next: (updatedItem) => {
            const index = this.groceryItems.findIndex(i => i.id === updatedItem.id);
            if (index !== -1) {
              this.groceryItems[index] = updatedItem;
            }
            this.newItem = { name: '', quantity: 1, isPurchased: false };
            this.loadGroceryItems();
          },
          error: (error) => {
            alert('Failed to update item quantity. Please try again.');
          }
        });
      }
      return;
    }
  
    // Add new item if it doesn't exist
    this.groceryService.addGroceryItem({ item: this.newItem as any }).subscribe({
      next: (item) => {
        this.groceryItems.push(item);
        this.newItem = { name: '', quantity: 1, isPurchased: false };
      },
      error: (error) => console.error('Error adding item:', error)
    });
  }
  
  editItem(item: GroceryItem): void {
    const newName = prompt('Enter new name:', item.name);
    if (newName === null || !newName.trim()) {
      alert('Please enter a valid name for the item.');
      return;
    }
  
    const newQuantity = prompt('Enter the new quantity:', item.quantity.toString());
    const parsedQuantity = Number(newQuantity);
  
    if (
      newQuantity === null || 
      !Number.isInteger(parsedQuantity) || 
      parsedQuantity <= 0
    ) {
      alert('Please enter the amount you need to buy.');
      return;
    }
  
    this.groceryService.updateGroceryItem({
      id: item.id,
      item: {
        name: newName.trim(),
        quantity: parsedQuantity,
      }
    }).subscribe({
      next: (updatedItem) => {

        // Replace the old item in the list with the updated one
        const index = this.groceryItems.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.groceryItems[index] = updatedItem;
        }
        this.loadGroceryItems();
      },
      error: (error) => console.error('Error updating item:', error),
    });
  }

  deleteItem(id: number): void {
    if (!confirm('Are you sure you want to delete this item?')) return;

    this.groceryService.deleteGroceryItem({ id }).subscribe({
      next: () => {
        this.groceryItems = this.groceryItems.filter(item => item.id !== id);
      },
      error: (error) => console.error('Error deleting item:', error)
    });
  }

  togglePurchased(item: GroceryItem): void {
    this.groceryService.togglePurchaseStatus({ id: item.id, isPurchased: !item.isPurchased }).subscribe({
      next: (updatedItem) => {
        const index = this.groceryItems.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.groceryItems[index] = { ...this.groceryItems[index], ...updatedItem };
        }
      },
      error: (error) => console.error('Error toggling purchase status:', error)
    }) ;
    this.loadGroceryItems();
  }
}
