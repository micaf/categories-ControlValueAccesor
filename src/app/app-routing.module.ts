import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' }, 
  { path: 'categories', component: CategoriesComponent },
  { path: 'add-category', component: AddCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
