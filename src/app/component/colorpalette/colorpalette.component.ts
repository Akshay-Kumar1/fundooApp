import { Component, OnInit, Input ,Output,EventEmitter,OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-colorpalette',
  templateUrl: './colorpalette.component.html',
  styleUrls: ['./colorpalette.component.scss']
})
export class ColorpaletteComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  token = localStorage.getItem('token');
  private body: any = {};
  @Input() colorChange;
  @Output() colorRefresh = new EventEmitter()
  constructor(private myHttpService: HttpService,private notesService:NoteserviceService) { }
  @Output() colorEmit = new EventEmitter();
/**
 * @description : Colors Array
 */
  Array = 
  [[
  { 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  ngOnInit() {

  }
/**
 * @description : Apply color to notes API
 */
  cardsColor(id) 
  {
    this.colorEmit.emit(id)
    if(this.colorChange!=undefined)
    {
    this.body = 
    {
      "color": id,
      "noteIdList": [this.colorChange.id]
    }

    this.notesService.postColor(this.body)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.colorRefresh.emit({
          })
        })
     }
 }
 ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}
