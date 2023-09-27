import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryComponent } from './add-category.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoriesService: CategoriesService;
  let formBuilder: FormBuilder;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        CategoriesService,
        FormBuilder,
        MatDialog,
        Router,
        HttpClient,
        HttpHandler
      ],
    });

    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    formBuilder = TestBed.inject(FormBuilder);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

    // Initialize the category form with test values
    component.categoryForm = formBuilder.group({
      id: "02",
      name: 'Test Category',
      referenceCode: 'ABC123',
    });

    // Prevent the component from actually navigating
    spyOn(router, 'navigate');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a category successfully', () => {
    // Simulate a successful response from the service when adding a category
    spyOn(categoriesService, 'addCategory').and.returnValue(of({}));

    // Verify that isLoading changes to false
    // Call the method to add a category
    component.addCategory();
    expect(component.isLoading).toBeFalsy();

    // Simulate the dialog being opened
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}), // Simulate the dialog being closed successfully
      close: null, // Initially, the close method is null
    });

    // Spy on the open method of the dialog service and return the dialogRefSpyObj
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should handle error when adding a category', async () => {
    // Simulate an error in the categories service
    const errorMessage = 'Error adding category';
    spyOn(categoriesService, 'addCategory').and.returnValue(throwError(() => errorMessage));

    // Call the method to add a category
    component.addCategory();

    // Verify that isLoading changes to true and then to false
    expect(component.isLoading).toBeTruthy();

    // Verify that the addCategory method of the service was called with the correct data
    expect(categoriesService.addCategory).toHaveBeenCalledWith({
      id: '02', // Provide a valid value for 'id'
      name: 'Test Category',
      referenceCode: 'ABC123',
    })

    // Simulate the dialog being opened
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}), // Simulate the dialog being closed successfully
      close: null, // Initially, the close method is null
    });

    // Spy on the open method of the dialog service and return the dialogRefSpyObj
    spyOn(dialog, 'open').and.returnValue(dialogRefSpyObj);
  });
});
