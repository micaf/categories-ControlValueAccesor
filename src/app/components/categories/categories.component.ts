import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  categoriesData: Category[] = [];

  error: string = '';

  isLoading = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loadCategoriesData();
  }

  loadCategoriesData() {
    this.isLoading = true;
    this.categoriesService.getCategoriesData().subscribe(
      {
        next: (data) => {
          this.isLoading = false;
          this.categoriesData = data;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
        }
      }
    );
  }
}
