import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit{
  message!: string;
  title!: string;
  showCancel: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.message = this.data.message;
    this.title = this.data.title;
    this.showCancel = this.data.showCancel;
  }

  confirm(): void {
    this.close();
    if (this.data.onConfirm) {
      this.data.onConfirm();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
