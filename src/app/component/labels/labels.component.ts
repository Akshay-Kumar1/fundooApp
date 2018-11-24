import { Component, OnInit, Input , OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../core/services/httpService/http.service'
import { NoteserviceService } from '../../core/services/noteService/noteservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private labelName:any;
  private labelList:any=[]
  access_token=localStorage.getItem('token')
  constructor(private router:ActivatedRoute,private myHttpService:HttpService,
  private notesService:NoteserviceService) { }

  ngOnInit() 
  {
    this.router.params.subscribe((params:Params)=>{
      this.labelName= params['labelName'] 
      this.labelByName(this.labelName)
    })
  }
  /**
 * @description : Get labelName API
 */
  labelByName(labelName)
  {
      this.notesService.labelByNames(labelName,{})
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.labelList=data['data']['data']
      
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
