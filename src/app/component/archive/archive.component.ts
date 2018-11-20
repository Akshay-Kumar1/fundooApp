import { Component, OnInit, Input,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service';
import {LoggerService} from '../../core/services/logger/logger.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  token=localStorage.getItem('token')
   private array:any=[];
   private newArray:any=[]
  @Input() unArchive
  constructor(private myHttpService:HttpService,private notesServices:NoteserviceService) { }

  ngOnInit() 
  {
    this.getArchs()
  }
/**
 * @description : Get Archives API
 */
  getArchs()
  {
    this.notesServices.getArchive() 
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.newArray=[]

        for (let i = 0; i < data['data']['data'].length ; i++) {  
          this.newArray.push(data['data']['data'][i])
        }
        this.array=this.newArray
      })
      error=>
      {
        LoggerService.error('error',error);
      }
  }
  /**
 * @description : Get Archives Event Emitter
 */
  getArchive(event)
  {
    if(event)
    {
      this.getArchs()
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
