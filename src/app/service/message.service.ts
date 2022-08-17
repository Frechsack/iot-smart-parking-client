import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

const DURATION_DEFAULT = 4000;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private ref?: MatSnackBarRef<any>;

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  public message(message: string): MatSnackBarRef<any>{
    if(this.ref) this.ref.dismiss();
    this.ref = this.snackBar.open(message, undefined, { duration: DURATION_DEFAULT });
    return this.ref;
  }

  public error(message: string, status?: number): MatSnackBarRef<any> {
    if(this.ref) this.ref.dismiss();
    if(status){
      this.ref = this.snackBar.open(message + ' ' + status, 'OK', { duration: DURATION_DEFAULT * 2 });
    }else {

      this.ref = this.snackBar.open(message, 'OK', { duration: DURATION_DEFAULT * 2 });
    }
    return this.ref;
  }
}
