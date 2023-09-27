import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpinnerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SharedModule { }
