import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroceryItem } from '../models/grocery-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = `${environment.apiUrl}/api/Item`;

  constructor(private http: HttpClient) {}

  getGroceryItems(): Observable<GroceryItem[]> {
    return this.http.get<GroceryItem[]>(this.apiUrl);
  }

  addGroceryItem({ item }: { item: Omit<GroceryItem, 'id' | 'createdAt' | 'updatedAt'>; }): Observable<GroceryItem> {
    return this.http.post<GroceryItem>(this.apiUrl, item);
  }

  updateGroceryItem({ id, item }: { id: number; item: Partial<GroceryItem>; }): Observable<GroceryItem> {
    return this.http.put<GroceryItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteGroceryItem({ id }: { id: number; }): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  togglePurchaseStatus({ id, isPurchased }: { id: number; isPurchased: boolean; }): Observable<GroceryItem> {
    return this.http.patch<GroceryItem>(`${this.apiUrl}/${id}/toggle-purchase`, { isPurchased: isPurchased });
  }

}