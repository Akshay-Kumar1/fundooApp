import { Component, OnInit, Input ,Output,EventEmitter,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-archivesub',
  templateUrl: './archivesub.component.html',
  styleUrls: ['./archivesub.component.scss']
})
export class ArchivesubComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
token=localStorage.getItem('token');
  private labelArray:any=[];
  constructor(private myHttpService:HttpService,private notesService:NoteserviceService) { }
  @Input() archive;
  @Output() archiveRefresh = new EventEmitter()
  ngOnInit() 
  {
    this.getNotes();
    this.getArchs();
  }
  /**
 * @description : Get Notes API
 */
  getNotes()
  {
  this.notesService.getNotesCollection()
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
    LoggerService.error('error',error);
  }
}
  /**
 * @description : archive a note API
 */
  archiveNotes()
  {
  const body=
  {
    "isArchived":true,
    "noteIdList":[this.archive.id]
  }
this.notesService.archive(body)
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
      this.getNotes()
      this.getArchs()
      this.archiveRefresh.emit({

      })
})
error=>
{
  LoggerService.error(error)
} 
}
  /**
 * @description : Unarchive a Note API
 */
unArchiveNotes()
{
  const body=
  {
    "isArchived":false,
    "noteIdList":[this.archive.id]
  }
this.notesService.unArchive(body)
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
  this.getNotes();
  this.getArchs()
  this.archiveRefresh.emit({
    
  })
})
error=>{
  LoggerService.error('error',error);
} 
}
/**
 * @description : Get Archives API
 */
getArchs()
{
  this.notesService.getArchive() 
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    let newArray=[]
      for (let i = 0; i < data['data']['data'].length ; i++) {  
        newArray.push(data['data']['data'][i])
      }
      this.labelArray=newArray
    })
    error=>
    {
      LoggerService.error('error',error);
    }
    
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}
