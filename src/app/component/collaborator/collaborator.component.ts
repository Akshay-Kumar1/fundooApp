import { Component, OnInit, Input } from '@angular/core';
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  @Input() collaboratorData
  constructor(private dialog:MatDialog) { }

  ngOnInit() 
  {

  }

  /**
 * @description : Dialog Popup for Collaborator
 */
  dialogOpen()
  {
      const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
        width:'500px',
        data:this.collaboratorData
      });
      dialogRef.afterClosed().subscribe(result => {
      });
  }

}
