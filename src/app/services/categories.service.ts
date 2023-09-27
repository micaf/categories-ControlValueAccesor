import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getCategoriesData(): Observable<Category[]> {
    const categoriesUrl = this.baseUrl + 'categories';
    return this.http.get<Category[]>(categoriesUrl);
  }

  getSubCategoriesData(): Observable<Subcategory[]> {
    const subcategoriesUrl = this.baseUrl + 'subcategories';
    return this.http.get<Subcategory[]>(subcategoriesUrl);
  }
  addCategory(categoryData: Category): Observable<any> {
    const categoriesUrl = this.baseUrl + 'categories';
    
    return this.http.post<Category>(categoriesUrl, categoryData);
  }

}
