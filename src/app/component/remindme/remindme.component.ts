import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-remindme',
  templateUrl: './remindme.component.html',
  styleUrls: ['./remindme.component.scss']
})
export class RemindmeComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() noteDetails;
  @Output() todayEvent = new EventEmitter();
  @Output() todayEventDateInfo = new EventEmitter();
  private dateInfo:any;
  private dateInfoTomo:any;
  private dateInfoNextWeek:any
  private dateInfoCustom:any;
  private dateInfoCustoms:any;
  private reminderInfoCustom:any;
  private remindersInfoCustom:any;
  private remindersInfoCustoms:any;
  private remindersInfosCustoms:any;
  constructor(private httpService: HttpService,private notesService:NoteserviceService) { }
  public message;
  ngOnInit() {

  }

  private body = {};
  private currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', timeOfDay: 'Morning', viewTime: '08:00 AM'},
    { value: 'afternoon', timeOfDay: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', timeOfDay: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', timeOfDay: 'Night', viewTime: '09:00 PM'}];

  /**
 * @description : Add Reminder Today API
 */

  addRemToday() {
    this.dateInfo=new Date(this.currentDate.getFullYear(), 
    this.currentDate.getMonth(), this.currentDate.getDate(), 20, 0, 0, 0)
    this.todayEventDateInfo.emit(this.dateInfo)
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": this.dateInfo
    }
    this.notesService.reminder(
    this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      this.todayEvent.emit()
    })
    error=>
    {
      LoggerService.error('error',error);
    }
  }

  /**
 * @description : Add Reminder Tomorrow API
 */
  addRemTomorrow() {
    this.dateInfoTomo=new Date(this.currentDate.getFullYear(), 
    this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    this.todayEventDateInfo.emit(this.dateInfoTomo)
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder":this.dateInfoTomo 
        }
        this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      this.todayEvent.emit()
    })
    error=>
    {
      LoggerService.error('error',error);
    }
    
  }
 /**
 * @description : Add Reminder Next Week API
 */
  addRemNextWeek() 
  {
    this.dateInfoNextWeek=new Date(this.currentDate.getFullYear(), 
    this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    this.todayEventDateInfo.emit(this.dateInfoNextWeek)
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder":this.dateInfoNextWeek 
    }
    this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      console.error(result)
      this.todayEvent.emit()
    })
    error=>
    {
      LoggerService.error('error',error);
    }
    
  }

  show = true
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() { 
    this.show = true;
  }
  reminderBody={
    "date": new FormControl(new Date()),
    "time":""
  }
  
   /**
 * @description : Add Custom Reminders API
 */
  addRemCustom(date,timing){
    
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    
    if(timing=='8:00 AM'){
    this.dateInfoCustom=new Date(date.getFullYear(), 
    date.getMonth(), date.getDate(), 8, 0, 0, 0)
    this.todayEventDateInfo.emit(this.dateInfoCustom)
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": this.dateInfoCustom
      }
      this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
        this.todayEvent.emit()
      })
      error=>
    {
      LoggerService.error('error',error);
    }
    
    }else if(timing=='1:00 PM'){
    this.dateInfoCustoms=new Date(date.getFullYear(), date.getMonth(),
     date.getDate(), 13, 0, 0, 0)
    this.todayEventDateInfo.emit(this.dateInfoCustoms)
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": this.dateInfoCustoms
      }
      this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
        this.todayEvent.emit()
      })
      error=>
    {
      LoggerService.error('error',error);
    }
    
    }else if(timing=='6:00 PM'){
    this.reminderInfoCustom=new Date(date.getFullYear(), 
    date.getMonth(), date.getDate(), 18, 0, 0, 0)
    this.todayEventDateInfo.emit(this.reminderInfoCustom)
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": this.reminderInfoCustom
      }
      this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {

        this.todayEvent.emit()
      })
      error=>
    {
      LoggerService.error('error',error);
    }
    
    }else if(timing=='9:00 PM'){
    this.remindersInfoCustom=new Date(date.getFullYear(), 
    date.getMonth(), date.getDate(), 21, 0, 0, 0)   
    this.todayEventDateInfo.emit(this.remindersInfoCustom)
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": this.remindersInfoCustom
      }
      this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
        this.todayEvent.emit()
      })
      error=>
      {
        LoggerService.error('error',error);
      }
      
    }else if(timing==this.reminderBody.time){
      var x;
      var splitTime=this.reminderBody.time.split("",8);
      var hour= Number(splitTime[0]+splitTime[1]);
      var minute= Number(splitTime[3]+splitTime[4]);
      var ampm = (splitTime[6]+splitTime[7]);
     
      if(ampm=='AM' || ampm=='am'){
    this.remindersInfoCustoms=new Date(date.getFullYear(), 
    date.getMonth(), date.getDate(), hour, minute, 0, 0)   
    this.todayEventDateInfo.emit(this.remindersInfoCustoms)
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": this.remindersInfoCustoms
        }
        this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
          this.todayEvent.emit()
        })
        error=>
    {
      LoggerService.error('error',error);
    }
    
      }else if(ampm=='PM' || ampm=='pm'){
        this.remindersInfosCustoms=new Date(date.getFullYear(), 
        date.getMonth(), date.getDate(), hour+12, minute, 0, 0)   
        this.todayEventDateInfo.emit(this.remindersInfosCustoms)
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": this.remindersInfosCustoms
        }
        this.notesService.reminder(this.body).pipe(takeUntil(this.destroy$)).subscribe((result) => {
          this.todayEvent.emit()
        })
        error=>
    {
      LoggerService.error('error',error);
    }
    
      }
      
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}