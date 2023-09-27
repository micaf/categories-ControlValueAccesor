import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRef: MatDialogRef<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MatDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            message: 'Test Message',
            showCancel: true,
            onConfirm: () => { /* Mock confirmation function */ }
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { /* Mock close function */ }
          }
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.title).toBe('Test Title');
    expect(component.message).toBe('Test Message');
    expect(component.showCancel).toBe(true);
  });

  it('should confirm and close the dialog', () => {
    spyOn(dialogRef, 'close');
    spyOn(component.data, 'onConfirm');

    component.confirm();

    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.data.onConfirm).toHaveBeenCalled();
  });

  it('should close the dialog', () => {
    spyOn(dialogRef, 'close');

    component.close();

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
