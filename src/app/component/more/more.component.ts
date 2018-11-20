import { Component, OnInit ,Input, EventEmitter,Output,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})

export class MoreComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  private labelArray:any=[];
  @Input() deleteCard;
  @Output() trash = new EventEmitter();
  @Output() labelEvent = new EventEmitter();
  token=localStorage.getItem('token')
  private labelArr:any=[]
  constructor(private myHttpService:HttpService,public snackBar: MatSnackBar,
  private notesService:NoteserviceService) { }
 /**
 * @description : Delete Notes API
 */
  delete(deleteCard)
  {
  const body=
  {
    "isDeleted":true,
    "noteIdList":[this.deleteCard.id] }
    this.notesService.deleteNotes(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
            this.snackBar.open('Note Binned', 'Success', {
              duration: 2000,
            });
          this.trash.emit({
    
          })
    })
    error=>{
      LoggerService.error('error',error);
    } 
    }
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
              })
              error => 
              {
                LoggerService.error('error',error);
              }
      }
  
 /**
 * @description : Add Labels API
 */
  addLabelTag(label)
  {
    this.labelEvent.emit(label);
    
    this.notesService.addLabelTags(this.deleteCard.id,label.id,
    {
      "noteId":this.deleteCard.id,
      "lableId":label.id
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.trash.emit({

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
