import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service' 
import { DeletenoteComponent } from '../deletenote/deletenote.component';
import { MatDialog, MatSnackBar } from '@angular/material';
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
   
  }
  /**
 * @description : Delete Forever API
 */
  deleteForever(id)
  {
    const dialogRef = this.dialog.open(DeletenoteComponent, { 
      width:'300px',maxWidth:'auto',
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

}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}
