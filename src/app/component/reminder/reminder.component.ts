import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit ,OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  token=localStorage.getItem('token')
  private remindersList: any=[]
  private sortedReminder:any=[]
  constructor(public myHttpService:HttpService,private notesService:NoteserviceService) { }

  /**
 * @description : Get Reminders API
 */
  ngOnInit() 
  {
    this.notesService.getReminder() 
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
    this.remindersList=data['data']['data']
    this.remindersList.sort((a: any, b: any) =>
            new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
        );
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  

}
