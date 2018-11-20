import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../updatenotes/updatenotes.component';

@Component({
  selector: 'app-deletenote',
  templateUrl: './deletenote.component.html',
  styleUrls: ['./deletenote.component.scss']
})
export class DeletenoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletenoteComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit() 
  {
  }
  goBack()
  {
    this.dialogRef.close(); 
  }

}
