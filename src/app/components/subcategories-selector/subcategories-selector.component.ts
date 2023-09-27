import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subcategory } from 'src/app/models/subcategory.model';

@Component({
  selector: 'app-subcategories-selector',
  templateUrl: './subcategories-selector.component.html',
  styleUrls: ['./subcategories-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubcategoriesSelectorComponent),
      multi: true,
    },
  ],
})
export class SubcategoriesSelectorComponent implements OnInit, ControlValueAccessor {

  subcategories: Subcategory[] = [];
  selectedSubcategories: Subcategory[] = [];
  referenceCodeSelected?: any[];
  hasInvalidSelection = false;
  private onChangefn!: Function;


  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getSubCategories();
  }
  getSubCategories() {
    this.categoriesService.getSubCategoriesData().subscribe(
      {
        next: (data) => this.subcategories = data,
        error: (error) => console.log(error)
      }
    )
  }

  writeValue(value: Subcategory[]): void {
    this.selectedSubcategories = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChangefn = fn;
  }

  changeSelection(subcategory: Subcategory): void {
    if (this.selectedSubcategories.includes(subcategory)) {
      // Remove subcategory if it's already selected
      this.selectedSubcategories = this.selectedSubcategories.filter(
        (item) => item !== subcategory
      );
    } else {
      // Add subcategory if it's not selected
      this.selectedSubcategories.push(subcategory);
    }

    this.onChangefn(this.selectedSubcategories)


  }

  registerOnTouched(fn: any): void { }


}

