import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { NotesInfo } from 'src/app/core/models/notes-info';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-cardtemplate',
  templateUrl: './cardtemplate.component.html',
  styleUrls: ['./cardtemplate.component.scss']
})
export class CardtemplateComponent implements OnInit , OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  token = localStorage.getItem('token')
  private array:NotesInfo []= []
  private pinned: any= []
  private newArray:any= [];
  public loader:boolean=false;
  constructor(private myHttpService: HttpService,private notesService:NoteserviceService) { }

  ngOnInit() {
    this.getCards();
    this.getCardsPinned();
  }
/**
 * @description : Get Notes API
 */
  getCards() 
  {
    
    this.notesService.saveNotes()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loader=true;
        this.array = [];
        var noteArray:NotesInfo[]=data["data"]['data'];
        for (let i = noteArray.length - 1; i > 0; i--) {
          if (noteArray[i].isDeleted == false && noteArray[i].isArchived==false && noteArray[i].isPined==false) {
            this.array.push(noteArray[i])
          }
        }
       
      })
  }
    /**
 * @description : Get Pinned Notes API
 */
  getCardsPinned()
  {
    this.notesService.saveNotes()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.loader=true;
        this.newArray=[]
        for (let i = data['data']['data'].length - 1; i > 0; i--) {
          if(data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived==false && data['data']['data'][i].isPined==true )
          { 
              this.newArray.push(data['data']['data'][i])
              
          }
        }
      })
  }
  /**
 * @description :Event Emitter
 */
  cardsList() 
  {
    if(event) 
    {
      this.getCards();
      this.getCardsPinned()
    }
  }
  listOfCards(event:NotesInfo)
  {
    this.array.splice(0,0,event)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
