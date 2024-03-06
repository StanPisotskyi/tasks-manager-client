import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {FlashMessagesService} from "../helpers/flash-messages.service";
import {UserService} from "../services/user.service";
import {UserDeleteStateService} from "../helpers/user-delete-state.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './user-delete-modal.component.html',
  styleUrl: './user-delete-modal.component.css'
})
export class UserDeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private userDeleteState: UserDeleteStateService
  ) {
  }

  delete() {
    this.userService.delete(this.data.id)?.subscribe(
      {
        next: response => {
          this.dialogRef.close();
          this.userDeleteState.setId(this.data.id);
        },
        error: response => {
          this.flashMessagesService.showMessage('Something went wrong...');
        }
      }
    );
  }
}
