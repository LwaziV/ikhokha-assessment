import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable({
    providedIn: 'root'
})
export class MessageHandlerService {
    constructor(private snackBar: MatSnackBar) { }
    //  Display all necessary response messages through snackBar toast
    displayMessage(message: string) {
        this.snackBar.open(message, '', {
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["custom-toast-style"]
        });
    }

}