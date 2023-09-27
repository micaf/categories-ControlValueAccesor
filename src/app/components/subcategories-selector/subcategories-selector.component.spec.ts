import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SubcategoriesSelectorComponent } from './subcategories-selector.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SubcategoriesSelectorComponent', () => {
  let component: SubcategoriesSelectorComponent;
  let fixture: ComponentFixture<SubcategoriesSelectorComponent>;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcategoriesSelectorComponent],
      imports: [FormsModule],
      providers: [CategoriesService, HttpClient, HttpHandler],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoriesSelectorComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch subcategories on initialization', () => {
    const mockSubcategories = [
      { id: '1', name: 'Subcategory 1' },
      { id: '2', name: 'Subcategory 2' },
    ];

    spyOn(categoriesService, 'getSubCategoriesData').and.returnValue(of(mockSubcategories));

    component.ngOnInit();

    expect(component.subcategories).toEqual(mockSubcategories);
  });

  it('should write value to selectedSubcategories', () => {
    const selectedSubcategories = [
      { id: '1', name: 'Subcategory 1' },
      { id: '2', name: 'Subcategory 2' },
    ];

    const onChangeCallback = jasmine.createSpy('onChangeCallback');
    component.registerOnChange(onChangeCallback);
    component.writeValue(selectedSubcategories);

    expect(component.selectedSubcategories).toEqual(selectedSubcategories);
  });

  it('should change selection', () => {
    const subcategory1 = { id: '1', name: 'Subcategory 1' };
    const subcategory2 = { id: '2', name: 'Subcategory 2' };

    const onChangeCallback = jasmine.createSpy('onChangeCallback');
    component.registerOnChange(onChangeCallback);

    component.changeSelection(subcategory1);
    expect(component.selectedSubcategories).toContain(subcategory1);
    expect(onChangeCallback).toHaveBeenCalledWith([subcategory1]);

    component.changeSelection(subcategory1);
    expect(component.selectedSubcategories).not.toContain(subcategory1);
    expect(onChangeCallback).toHaveBeenCalledWith([]);

    component.changeSelection(subcategory2);
    expect(component.selectedSubcategories).toContain(subcategory2);
    expect(onChangeCallback).toHaveBeenCalledWith([subcategory2]);
  });
});
