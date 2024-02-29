import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

}
