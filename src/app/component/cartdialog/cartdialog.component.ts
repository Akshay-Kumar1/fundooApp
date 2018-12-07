import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../updatenotes/updatenotes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartdialog',
  templateUrl: './cartdialog.component.html',
  styleUrls: ['./cartdialog.component.scss']
})
export class CartdialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData,private router:Router,
  private dialogRef: MatDialogRef<CartdialogComponent>) { }
  ngOnInit() 
  {
    
  }
  gotoSignup()
  {
    this.router.navigateByUrl('/signup');
    this.dialogRef.close();
  }
  close()
  {
    this.dialogRef.close();
  }

}
