import { Component, OnInit, Output, EventEmitter, ViewChild , OnDestroy, ElementRef,Input} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { UserserviceService } from 'src/app/core/services/userService/userservice.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public show: boolean = true;
  @ViewChild ('titleId') titleId:ElementRef
  @ViewChild ('noteId') noteId:ElementRef
  access_token = localStorage.getItem('token');
  private labelArray:any=[]
  @Output() eventEmit = new EventEmitter();
  @Output() labelEvent=new EventEmitter();
  @Output() notesEmit=new EventEmitter();
  private body : any = {}
  searchString:any=[]
  private notesBody:any={}
  private color : any='#fafafa';
  private dataarray:any=[]
  private  remArray:any=[];
  private remVar:any;
  private today=new Date();
  private tomorrow=new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+1);
  private checked: boolean = false;
  private dataArrayCheck=[];
  private status="open";
  private move: boolean = false;
  private collaborator=[]
  data: any;
  rem:any;
  collaboratorArray: any=[];
  constructor(private myHttpService: HttpService,
    private notesService:NoteserviceService,private userService:UserserviceService) { }
  /**
 * @description : Get Labels API
 */
firstName = localStorage.getItem('firstName')
email = localStorage.getItem('email')
lastName = localStorage.getItem('lastName')
image = localStorage.getItem('imageUrl')
profilePic = environment.profilePicUrl + this.image;
  ngOnInit() 
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
    this.eventEmit.emit()
    })
  }

  /**
 * @description : Toggles for hide and show
 */
  toggle() 
  {
    this.show = !this.show
  }
  public display: boolean = true;
  collaboratorToggle()
  {
    this.display=!this.display
  }
  togg() 
  {
    this.show = !this.show
    this.move = true;
  }

  /**
 * @description : addNotes API
 */
  
    addNotes()
    {
      this.show = !this.show
      this.move = false;
      this.rem=''
    if(this.remVar!=undefined)
    {
      this.rem=this.remVar
    }

  if(this.checked == false)
  {
      
    this.notesService.addNotes( {
      'title': this.titleId.nativeElement.innerHTML,
        'description': this.noteId.nativeElement.innerHTML,
        'labelIdList': JSON.stringify(this.labelId),
        'checklist': '',
        'isPined': 'false',
        'color' : this.color,
        'reminder':this.rem,
        'collaberators':JSON.stringify(this.collaborator)
    })
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.labelId=[]
        this.labelArray=[]
        this.name=[]
        this.remArray=[]
        this.move = false;
        this.rem='';
        this.notesEmit.emit(data['status'].details)
        this.remVar=''
        this.collaborator=[];
        this.searchString=[]
      },error => {
        this.labelId=[]
        this.labelArray=[]
        this.remArray=[]
        this.name=[]
        this.rem='';
        this.remVar=''
    })
  }

  /**
 * @description : CheckList for Notes
 */
  else
  {
    this.rem=''
      if(this.remVar!=undefined)
      {
        this.rem=this.remVar
      }
    this.move = true;
    this.dataArrayCheck = [];
    for(var i=0;i<this.dataarray.length;i++){
      if(this.dataarray[i].isChecked==true){
       this.status="close"
      }
      var apiObj={
        "itemName":this.dataarray[i].data,
        "status":this.status
      }
      this.dataArrayCheck.push(apiObj) 
      this.status="open"
    }
  /**
 * @description : CheckList API , passing checklists to add notes API
  */

    this.notesService.addNotes( {
      'title': this.titleId.nativeElement.innerHTML,
      'labelIdList': JSON.stringify(this.labelId),
      'checklist': JSON.stringify(this.dataArrayCheck),
      'isPined': 'false',
      'color' : this.color,
      'reminder':this.rem,
      'collaberators':JSON.stringify(this.collaborator)
    }).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.checked = false;
        this.labelId=[]
        this.labelArray=[]
        this.remArray=[]
        this.name=[]
        this.dataArrayCheck=[]
        this.remVar=''
        this.rem=''
        this.move = false;
        this.notesEmit.emit(data['status'].details)
        this.collaborator=[];
        this.searchString=[]
      },error => {
        this.labelId=[]
        this.labelArray=[]
        this.name=[]
        this.remArray=[]
        this.dataArrayCheck=[]
        this.remVar=''
        this.rem=''
    })
  }
}

  colorEntry(event)
  {
     this.color = event;
  }

  private name = [];
  private labelId = [];
  /**
 * @description : Removing labels 
 */
  eventOfLabels(event)
  {
  
      if(this.name.indexOf(event)<0)
      { 
      this.labelId.push(event.id);
      this.name.push(event);
      }
      else
      {
      this.labelId.splice(this.labelId.indexOf(event),1)
      this.name.splice(this.name.indexOf(event),1)
      }
  }

  /**
 * @description : functionality for enter keypress
 */
  public i=0;
enter(){
  this.i++;
  if(this.data!=null){
    var obj={
      "index":this.i,
      "data":this.data
    }
    this.dataarray.push(obj);
    this.data=null
    
  }
}
   /**
 * @description : untick checkList
 */
ondelete(deletedObj){
 
  for(var i=0;i<this.dataarray.length;i++){
    if(deletedObj.index==this.dataarray[i].index){
      this.dataarray.splice(i,1);
      break;
    }
  }
 
}

editing(event,edited){

  if(event.code=="Enter"){
    for(var i=0;i<this.dataarray.length;i++){
      if(edited.index==this.dataarray[i].index){
        this.dataarray[i].data==edited.data
      }
    }
    
  }
}
id=
{
  'id':''
}
reminderEvent(event)
{
  this.remArray.push(event)
  this.remVar=event;
}
deleteReminder()
{
  this.remArray=[];
  this.remVar=''

}
deleteNoteLabel()
{
  this.name=[];
  this.labelId=[];
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

search()
{
    this.userService.usersSearch(
      {
      "searchWord":this.searchString
      }).pipe(takeUntil(this.destroy$)).subscribe(data=>{
        this.collaboratorArray=data['data']['details']
    })
}
select(email)
{
  this.searchString=email;
}
loadCollaborator(searchString)
{
  for(let i =0 ; i< this.collaboratorArray.length ; i++)
  {
    if(this.collaboratorArray[i].email==searchString)
    {
      this.collaborator.push(this.collaboratorArray[i])
    }
  }
}
cancel()
{
  this.collaborator=[]
}

}
