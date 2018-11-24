import { Component, OnInit , ViewChild , ElementRef, Inject, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdatenotesComponent, DialogData } from '../updatenotes/updatenotes.component';
import { UserserviceService } from 'src/app/core/services/userService/userservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit , OnDestroy { 
  constructor(public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    public dialog:MatDialog,
    private userService: UserserviceService,private notesService:NoteserviceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  @Output() collabEmit=new EventEmitter()
  collaboratorArray:any=[]
  destroy$: Subject<boolean> = new Subject<boolean>();

  firstName = localStorage.getItem('firstName')
  email = localStorage.getItem('email')
  lastName = localStorage.getItem('lastName')
  image = localStorage.getItem('imageUrl')
  profilePic = environment.profilePicUrl + this.image;
  searchString:any=[]
  collabArray:any=[]
  ngOnInit() 
  {
     for(let i=0 ; i < this.data['collaborators'].length; i++)
      this.collabArray.push(this.data['collaborators'][i])
  }
  /**
 * @description : Close Dialog
 */
  close()
  {
    this.dialogRef.close()
    // const dialogRef = this.dialog.open(UpdatenotesComponent, {
    //   width:'450px',height:'auto',
    //   data:this.data
    // });
    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

  /**
 * @description : Collaborator API
 */
  collaborate(require)
  {

    this.notesService.collaboratorPost(this.data.id,
    {
      "firstName":require.firstName,
      "lastName":require.lastName,
      "email":require.email,
      "userId":require.userId
    })
      .pipe(takeUntil(this.destroy$)).subscribe(data=>{
    })
  }

 /**
 * @description : Search Users List API
 */

  search()
  {
      this.userService.usersSearch(
        {
        "searchWord":this.searchString
        }).pipe(takeUntil(this.destroy$)).subscribe(data=>{
          this.collaboratorArray=data['data']['details']
      })
  }

  removeCollaborator(userId)
  {
      this.notesService.deleteCollaborator(this.data.id,userId).subscribe(data=>{
        LoggerService.log('data',data),
        error=>
        {
            LoggerService.error('error',error)
        }
      })
  }
  select(email)
  {
    this.searchString=email;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
