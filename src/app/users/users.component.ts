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
    MatHeaderCellDef
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'role', 'actions'];

  constructor(private userService: UserService) {
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
