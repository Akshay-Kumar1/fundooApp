import { Component, OnInit, Inject, Output ,EventEmitter,ViewChild,ElementRef,OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { SavenotesComponent } from '../savenotes/savenotes.component';
import { HttpService } from '../../core/services/httpService/http.service'
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
export interface DialogData {
  title: string;
  description: string;
  id: string;
}
@Component({
  selector: 'app-updatenotes',
  templateUrl: './updatenotes.component.html',
  styleUrls: ['./updatenotes.component.scss'] 
})
export class UpdatenotesComponent implements OnInit , OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() updateEmit = new EventEmitter()
  @ViewChild ('updateLabel') updateLabel:ElementRef
  @ViewChild ('updateLabelDesc') updateLabelDesc:ElementRef 
  token = localStorage.getItem('token');
  private labelArray: any=[]
  private remList: any=[]
  private checklist:any=false;
  private modifiedCheckList:any=[]
  private tempArray=[]
  private newList;
  private newData;
  body:any={}
  constructor(private myHttpService: HttpService, private notesService:NoteserviceService,
    private dialogRef: MatDialogRef<SavenotesComponent>, @Inject(MAT_DIALOG_DATA) private data: DialogData) { }

  /**
 * @description : Get Reminders API
 */
  ngOnInit() 
  {
    this.notesService.getReminder() 
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.remList=data['data']['data']
    })
    error=>
    {
      LoggerService.error('error',error);
    }

    if (this.data['noteCheckLists'].length>0){
      this.checklist=true;
    }
    this.tempArray=this.data['noteCheckLists']

  }


  /**
 * @description : Update Notes API
 */
  notesUpdate() 
  {
    if(this.checklist==false)
    {
      this.notesService.updateNotes({
        'noteId': [this.data.id],
        'title': this.updateLabel.nativeElement.innerHTML,
        'description': this.updateLabelDesc.nativeElement.innerHTML
      },)
      .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.updateEmit.emit({
  
          })
          this.dialogRef.close();

        })
      error => {
        LoggerService.error('error',error);
        this.dialogRef.close();
      }
      this.dialogRef.close();
      
    }
     
      else{
        var apiData={
          "itemName": this.modifiedCheckList.itemName,
          "status":this.modifiedCheckList.status
      }
      this.notesService.updateCheck(this.data['id'],this.modifiedCheckList.id,
      JSON.stringify(apiData)).subscribe(response => { 

      })
      this.dialogRef.close();

      }
      error => {
        LoggerService.error(error);
        this.dialogRef.close();

      }
      this.dialogRef.close();

  }
  /**
 * @description : Remove Labels in Update Notes API
 */
  removeLabelTag(label,labelId)
  {
    this.notesService.removeLabelTags(this.data.id,labelId,
    {
      "noteId":this.data.id,  
      "lableId":labelId
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
    })
    error=>
    {
      LoggerService.error('error',error);
    }
  }
  /**
 * @description : Remove Reminders for update Notes API
 */
  removeReminder(id)
  {
    this.notesService.removeReminders(
    {
      "noteIdList":[this.data.id] 
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      
    })
    error=>
    {
      LoggerService.error('error',error);
    }
  } 
  /**
 * @description : checking staus of checkList
 */
  checkBox(checkList) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }

    this.modifiedCheckList = checkList;
    this.notesUpdate();
  }
  public removedList;

  removeList(checklist){
    this.removedList=checklist;
    this.removeCheckList()
  }
  public adding=false;
  public addCheck=false;
  public status="open"

   /**
 * @description : CheckList Add API
 */
  addList(event){
    if(this.newList!=""){
      this.adding = true;
    }
   else{
      this.adding = false;
   }
    if (event.code == "Enter") {
      if(this.addCheck==true){
        this.status="close";
      }
      else{
        this.status="open"
      }
      this.newData={
        "itemName":this.newList,
        "status":this.status
      }

    this.notesService.deleted(this.data['id'], this.newData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      this.newList=null;
      this.addCheck=false;
      this.adding=false;
      
      this.tempArray.push(response['data'].details)
 
    })
  }
  }
     /**
 * @description : Remove CheckList
 */
removeCheckList(){
   
  this.notesService.removeCheck(this.data['id'],this.removedList.id,null)
  .pipe(takeUntil(this.destroy$)).subscribe((response)=>{
    for(var i=0;i<this.tempArray.length;i++){
      if(this.tempArray[i].id==this.removedList.id){
        this.tempArray.splice(i,1)
      }
    }
  })
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}
