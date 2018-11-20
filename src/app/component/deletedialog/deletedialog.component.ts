import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { DialogData } from '../updatenotes/updatenotes.component';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { } 

  ngOnInit() 
  { 
    
  }
  goBack()
  {
    this.dialogRef.close();
  }
} 
