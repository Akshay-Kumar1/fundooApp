import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { DataserviceService } from '../../core/services/dataservice/dataservice.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-searchcomponent',
  templateUrl: './searchcomponent.component.html',
  styleUrls: ['./searchcomponent.component.scss']
})
export class SearchcomponentComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()
  private  globalSearch:any;
  constructor(private myHttpService:HttpService,public data:DataserviceService,private notesService:NoteserviceService) {}
 token=localStorage.getItem('token')
 private array:any=[]
  ngOnInit() 
  { 
    this.data.currentMessage.subscribe(message=>{ 
      this.globalSearch = message;
    })
    this.getCards(); 
  }
/**
 * @description : Get Notes List API
 */
  getCards() 
  {
    this.notesService.saveNotes()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.array = [];
        for (let i = data['data']['data'].length - 1; i > 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived==false) {
            this.array.push(data['data']['data'][i])
          }
        }
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
