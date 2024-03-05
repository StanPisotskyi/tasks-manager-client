import { Component } from '@angular/core';
import {User} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {MatAnchor, MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {UserFormStateService} from "../helpers/user-form-state.service";
import {FlashMessagesService} from "../helpers/flash-messages.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private userFormState: UserFormStateService,
    private flashMessagesService: FlashMessagesService
  ) {
    this.userFormState.state$.subscribe(state => {
      if (state === null) {
        return;
      }

      let message: string = '';

      if (state === 'created') {
        message = 'User has been created!';
      } else if (state === 'editedAccount') {
        message = 'Account has been edited!';
      }

      this.flashMessagesService.showMessage(message);
    });
  }

  ngOnInit() {
    this.userService.getAll()?.subscribe(
      {
        next: users => {
          this.users = users;
        }
      }
    );
  }
}
