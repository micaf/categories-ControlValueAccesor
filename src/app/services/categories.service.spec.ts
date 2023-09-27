import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService],
    });

    service = TestBed.inject(CategoriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories data', () => {
    const mockCategories = [
      { id: '1', name: 'Category 1', referenceCode: 'ABC123' },
      { id: '2', name: 'Category 2', referenceCode: 'DEF456' },
    ];

    service.getCategoriesData().subscribe((data) => {
      expect(data).toEqual(mockCategories);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should get subcategories data', () => {
    const mockSubcategories = [
      { id: '1', name: 'Subcategory 1' },
      { id: '2', name: 'Subcategory 2' },
    ];

    service.getSubCategoriesData().subscribe((data) => {
      expect(data).toEqual(mockSubcategories);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/subcategories');
    expect(req.request.method).toBe('GET');
    req.flush(mockSubcategories);
  });

  it('should add a category', () => {
    const mockCategory = { id: '3', name: 'Category 3', referenceCode: 'GHI789' };

    service.addCategory(mockCategory).subscribe((response) => {
      expect(response).toEqual(mockCategory);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCategory);
    req.flush(mockCategory);
  });


});
