import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, public dialog: MatDialog, private router: Router) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      referenceCode: [''],
      subcategories: []
    });
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      let newCategory: any = this.categoryForm.value;;
      this.categoriesService.addCategory(newCategory).subscribe({
        next: () => {
          this.isLoading = false;
          const dialogRef = this.dialog.open(DialogComponent, {
            data: { title: 'Categoria creata con successo', message: 'Volete tornare alla pagina iniziale?', showCancel: true },
         
          });

          dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/categories']);
          });
        },
        error: () => {
          this.dialog.open(DialogComponent, {
            data: { title: 'Errore nella creazione della categoria', message: "Si è verificato un errore nell'elaborazione della richiesta.", showCancel: false },
          });
        }
      });
    }


  }

}
