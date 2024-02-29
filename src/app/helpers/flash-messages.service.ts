import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {

  constructor(private snackBar: MatSnackBar) { }

  public showMessage(message: string): void {
    let sb = this.snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
