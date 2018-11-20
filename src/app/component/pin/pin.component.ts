import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/services/httpService/http.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() arrayPin
  private body={}
  @Output() emitter = new EventEmitter()
  constructor(private myHttpService:HttpService,private notesService :NoteserviceService) { }
  token=localStorage.getItem('token')
  ngOnInit() 
  {

  }
/**
 * @description : Pin Notes API
 */
  pin()
  {
  this.body={
    'noteIdList':[this.arrayPin.id],
    'isPined':true
  }
  this.notesService.pinUnpin(this.body)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
      this.emitter.emit({
      })
  })
  error=>
  {
    LoggerService.error('error',error);
  }
}

/**
 * @description : Unpin Notes API
 */
Unpin()
{
this.body={
  'noteIdList':[this.arrayPin.id],
  'isPined':false
}
this.notesService.pinUnpin(this.body)
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
    this.emitter.emit({
    })
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
