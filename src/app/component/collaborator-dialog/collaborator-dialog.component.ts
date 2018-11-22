import { Component, OnInit , ViewChild , ElementRef, Inject, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdatenotesComponent, DialogData } from '../updatenotes/updatenotes.component';
import { UserserviceService } from 'src/app/core/services/userService/userservice.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit { 
  constructor(public dialogRef: MatDialogRef<CollaboratorDialogComponent>,public dialog:MatDialog,
    private userService: UserserviceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  @ViewChild ('search') titleId:ElementRef
  firstName = localStorage.getItem('firstName')
  email = localStorage.getItem('email')
  lastName = localStorage.getItem('lastName')
  image = localStorage.getItem('imageUrl')
  profilePic = environment.profilePicUrl + this.image;
  searchString:any=[]
  ngOnInit() 
  {

  }
  close()
  {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      width:'450px',height:'auto',
      data:this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.trashEvent.emit({})
    });
  }
  search()
  {
      this.userService.usersSearch({
        "searchWord":this.searchString
        }).subscribe(data=>{
          LoggerService.log('data',data)
          error=>{
            LoggerService.error('error',error)
          }
      })
  }
  
}
