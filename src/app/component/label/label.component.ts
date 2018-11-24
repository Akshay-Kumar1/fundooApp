import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service'
import { Router } from '@angular/router';
import { DataserviceService } from '../../core/services/dataservice/dataservice.service';
import { MatDialog } from '@angular/material';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
  
})

export class LabelComponent implements OnInit , OnDestroy
{
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('newLabels') newLabels: ElementRef;
  @ViewChild('Labels') Labels: ElementRef;
  @Output() labelsEmit = new EventEmitter();
  token = localStorage.getItem('token')
  private id = localStorage.getItem('userId');
  private labelId = localStorage.getItem('id');
  private labelArray: any = []
  constructor(private myHttpService: HttpService, private route: Router,
    private dataService:DataserviceService,private dialog:MatDialog, 
    private notesService:NoteserviceService) { }

  ngOnInit() 
  {
    this.getLabels()
  }
  /**
 * @description : Get Labels Notes API
 */
  getLabels() 
  {
    this.notesService.labelsPrint()
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        let array=[];
        for (let i = 0; i < data['data']['details'].length; i++) 
        {
          if (data['data']['details'][i].isDeleted == false) 
          {
            array.push(data['data']['details'][i]);
          }
        }
        array.sort(function(a, b)
        {
          var A=a.label.toLowerCase(),B=b.label.toLowerCase()
          if(A < B) return -1;
          if(A > B ) return 1; 
           return 0;
        })
        this.labelArray=array;
        this.labelsEmit.emit({ 
        })
      })
  }
 /**
 * @description : Create Label API
 */
  createLabel() 
  {
    if(!this.labelArray.some((data)=>data.label ==this.newLabels.nativeElement.innerHTML))
    {
    this.notesService.label({
      "label": this.newLabels.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id,
    },)
    .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dataService.observeLabel(true);
        this.getLabels();
        this.labelsEmit.emit({
        })
      })
  }
  else alert('Warning..! Duplicate Label') 
}
/**
 * @description : Delete Label API
 */
  deleteLabel(id) 
  {
      const dialogRef = this.dialog.open(DeletedialogComponent, { 
        width:'fit-content',height:'fit-content',
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result)
      {
      this.notesService.deleteLabels(id).subscribe(data => {
      this.dataService.observeLabel(true);
      this.getLabels()
    })
   }
  });
  }
  /**
 * @description : Edit Label API
 */
  editLabel(id) 
  {
    this.notesService.editLabels(id,{
      "label": this.Labels.nativeElement.innerHTML,
      "isDeleted": false,
      "id":id,
      "userId":this.id
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => 
      {
        this.getLabels()
     })
  }
  edit:any;
  editToggle(id)
  {
    this.edit=id;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
