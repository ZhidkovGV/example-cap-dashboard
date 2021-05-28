import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user-confirmation-dialog',
  templateUrl: './delete-user-confirmation-dialog.component.html',
  styleUrls: ['./delete-user-confirmation-dialog.component.scss']
})
export class DeleteUserConfirmationDialogComponent {
  @Input() 
  public shareholderName: string;
}
