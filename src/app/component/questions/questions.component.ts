import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { QuestionServiceService } from 'src/app/core/services/questionService/question-service.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit , OnDestroy {
  private hide=0
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private router:ActivatedRoute, private notesService:NoteserviceService,
    private questionService:QuestionServiceService) { }
  private questionNotes;
  private title;
  private description;
  ngOnInit() 
  {
    this.router.params.subscribe((params:Params)=>
    {
      this.questionNotes=params['noteid'];
    })
     this.notesService.questionService(this.questionNotes)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      this.title=data['data']['data'][0].title
      this.description=data['data']['data'][0].description
    })
  }
  
postQuestion(questionTag)
{
  let array=[]
  this.questionService.askQuestion({
    "message": questionTag,
    "notesId":this.questionNotes
    }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    for(let i =0;i<data['data'].details['message'];i++ )
    array.push(data['data'].details['message'][i])
    this.hide=1
})
}
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
