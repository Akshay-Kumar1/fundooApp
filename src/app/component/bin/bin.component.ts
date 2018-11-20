import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service' 
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit , OnDestroy{
  destroy$: Subject<boolean> = new Subject<boolean>();
  token = localStorage.getItem('token')
  private array: any=[];
  constructor(private myHttpService: HttpService,private dialog:MatDialog,
    private snackBar:MatSnackBar,private notesServices:NoteserviceService) { }

  ngOnInit() 
  {
    this.getDeleted();
  }
/**
 * @description : Get deleted Notes API
 */
  getDeleted()
  {
    this.notesServices.trashNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      let newArr=[]
      for (let i = data['data']['data'].length - 1; i > 0; i--) {
        if (data['data']['data'][i].isDeleted == true) {
          newArr.push(data['data']['data'][i])
        }
      }
      this.array=newArr

    })
    error => {
      LoggerService.error('error',error);
    }
  }
  /**
 * @description : Delete Forever API
 */
  deleteForever(id)
  {
    const dialogRef = this.dialog.open(DeletenoteComponent, { 
      width:'fit-content',height:'fit-content',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
    this.notesServices.deleteTrash(
    {
      'noteIdList': [id],
      'isDeleted':true

    }).subscribe(data => {  
      this.getDeleted()
    })
    error => {
      LoggerService.error('error',error);
    }
  }
  })
  }
  /**
 * @description : Restore Notes API
 */
  restore(id)
  {
  const body=
  {
    "isDeleted":false,
    "noteIdList":[id]
  }
this.notesServices.restoreNotes(body)
.pipe(takeUntil(this.destroy$))
.subscribe(data=>{
      console.error(data);
      this.snackBar.open('Note Restored','Success',{
        duration: 2000,
      })
      this.getDeleted()
})
error=>{
  LoggerService.error('error',error);
} 
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}
