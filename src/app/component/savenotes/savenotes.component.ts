import { Component,OnInit,Input,EventEmitter,Output ,OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material'
import { UpdatenotesComponent } from '../updatenotes/updatenotes.component';
import { HttpService } from '../../core/services/httpService/http.service'
import { DataserviceService } from '../../core/services/dataservice/dataservice.service';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { CollaboratorDialogComponent } from '../collaborator-dialog/collaborator-dialog.component';
@Component({
  selector: 'app-savenotes',
  templateUrl: './savenotes.component.html',
  styleUrls: ['./savenotes.component.scss']
})
export class SavenotesComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() trashEvent= new EventEmitter()
 private labelArray:any=[]
 private toggle:true 
 private modifiedCheckList:any=[]
  token=localStorage.getItem('token')
private body:any={}
private  newArray=[]
private  labelName:any;
private  today=new Date();
private  collabArray=[];
private  tomorrow=new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1);

  constructor(private dialog:MatDialog,private myHttpService:HttpService , private notesService:NoteserviceService
    ,private dataService:DataserviceService,private router:Router,private acRoute:ActivatedRoute) { 
  this.dataService.labelObservable.subscribe(message=>{
    if(message){
      this.trashEvent.emit();
    }
  })
}
 @Input() cardsArr;
 @Input() globalSearch;

  ngOnInit() 
  {
    this.toggleView();
    this.getLabel();
  }
  /**
 * @description : Get labels API
 */
  getLabel()
  {
  this.notesService.labelsPrint()
  .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      let array=[]
    for(let i=0;i<data['data']['details'].length;i++)
  {
    if(data['data']['details'][i].isDeleted==false) 
    {
      array.push(data['data']['details'][i]);
    } 
  }
  this.labelArray=array;
  })
  error => 
  {
    LoggerService.error('error',error);;
  }
}
  refreshDelete(event)
  {
    this.trashEvent.emit({

    })
  }

  /**
 * @description : Remove Reminder API
 */
  removeReminder(id)
  {
    this.notesService.removeReminders(
    {
      "noteIdList":[id]
    })
    .subscribe(data=>{
      
      this.trashEvent.emit({
      })
    })
    error=>
    {
      LoggerService.error('error',error);
    }
  } 
  
  /**
 * @description : Remove labels API
 */
  removeLabelTag(id,labelId)
  {
    this.notesService.removeLabelTags(id,labelId,
    {
      "noteId":id,  
      "lableId":labelId
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
      this.trashEvent.emit({
      })
    })
    error=>
    {
      LoggerService.error('error',error);
    }
  } 

  /**
 * @description : Dialog popup for update Component
 */
  openDialog(content): void {
    const dialogRef = this.dialog.open(UpdatenotesComponent, {
      width:'auto',height:'auto',
      data: content
    });
    dialogRef.afterClosed().subscribe(result => {
      this.trashEvent.emit({})
    });
  }
  toggleView()
  {
     this.dataService.viewObservable.subscribe(message=>{
      this.toggle=message;
      
     })
  }

 checkBox(checkList,note) {

  if (checkList.status == "open") {
    checkList.status = "close"
  }
  else {
    checkList.status = "open"
  }
  this.modifiedCheckList = checkList;
  this.noteCheckList(note.id)
   
}

/**
 * @description : notes checklist API
 */
noteCheckList(id)
{
    var apiData={
      "itemName": this.modifiedCheckList.itemName,
      "status":this.modifiedCheckList.status
  }
  this.notesService.deleteTrashes(id,this.modifiedCheckList.id, JSON.stringify(apiData))
  .pipe(takeUntil(this.destroy$))
  .subscribe(response => {

  })
}
/**
 * @description : Striking of timed out Reminders
 */
reminderOff(strike)
{
  var currentReminderTime = new Date().getTime();
  var timeValue = new Date(strike).getTime();
  if(timeValue > currentReminderTime)
  {
     return true;
  } 
  else
  {
     return false;
  }
}

/**
 * @description : Get labels API
 */
getLabels() 
{
  let array=[];
  this.notesService.labelsPrint()
  .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      for (let i = 0; i < data['data']['details'].length; i++) 
      {
        if (data['data']['details'][i].isDeleted == false) 
        {
          array.push(data['data']['details'][i]);
        }
      }
      this.labelArray=array;
    })
  error => {
    LoggerService.error('error',error);
  }
}

openDialogCollaborator(content): void {
  const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
    width:'450px',height:'auto',
    data:content
  });
  dialogRef.afterClosed().subscribe(result => {
    this.trashEvent.emit({})
  });
}

ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}
