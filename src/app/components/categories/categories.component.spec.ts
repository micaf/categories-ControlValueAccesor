import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    // Configure a testing module for the component
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [CategoriesService,
        {
          provide: ActivatedRoute,
          useValue: {}
        }],
      imports: [HttpClientModule, RouterModule, AngularMaterialModule, SharedModule],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create an instance of the component and the service
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);

    // Spy on the getCategoriesData method of the service

    // Initialize the component
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories data on initialization', () => {
    // Simulate a successful response from the service
    const mockCategories = [
      { id: "1", name: 'Category 1', referenceCode: 'ABC123' },
      { id: "2", name: 'Category 2', referenceCode: 'DEF456' },
    ];
    spyOn(categoriesService, 'getCategoriesData').and.returnValue(of(mockCategories));

    // Call the initialization method
    component.ngOnInit();

    // Verify that isLoading is false and that categoriesData has been populated correctly
    expect(component.isLoading).toBeFalsy();
    expect(component.categoriesData).toEqual(mockCategories);
  });

  it('should handle error when loading categories data', () => {
    // Simulate an error in the service
    const errorMessage = 'Error loading categories';
    spyOn(categoriesService, 'getCategoriesData').and.returnValue(throwError(() => errorMessage));

    // Call the initialization method
    component.ngOnInit();

    // Verify that isLoading is false and that the error message has been set correctly
    expect(component.isLoading).toBeFalsy();
    expect(component.error).toEqual(errorMessage);
  });
});
