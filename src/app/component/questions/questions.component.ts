import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { QuestionServiceService } from 'src/app/core/services/questionService/question-service.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit , OnDestroy {
  private hide=0
  destroy$: Subject<boolean> = new Subject<boolean>();
  newArray: any=[]
  constructor(private router:ActivatedRoute, private notesService:NoteserviceService,
  private questionService:QuestionServiceService) { }
  @ViewChild('questionTag') questionTag:ElementRef
  @ViewChild('reply') reply:ElementRef
  private questionNotes;
  private title;
  private description;
  private saveMessage;
  private question;
  private likeHide=0;
  private likeCounter;
  private likeId;
  private replyArray=[];
  private display=0;
  private replyMessages=[];
  private getUser
  private getUserEmail=[]
  private getProfile;
  private getTime;
  private parentId;
  firstName = localStorage.getItem('firstName')
  email = localStorage.getItem('email')
  lastName = localStorage.getItem('lastName')
  image = localStorage.getItem('imageUrl')
  private photo=environment.profilePicUrl;
  private ownerPhoto=environment.profilePicUrl+this.image
  ngOnInit() 
  {
    this.router.params.subscribe((params:Params)=>
    {
      this.questionNotes=params['noteid'];
    })
     this.notesService.questionService(this.questionNotes)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data)
      this.getUser=data['data']['data'][0]['questionAndAnswerNotes']
      // this.getTime = this.getUser[0].createdDate
      // this.getUserEmail=this.getUser[0]['user'].firstName
      this.title=data['data']['data'][0].title
      this.description=data['data']['data'][0].description
      this.replyArray=data['data']['data'][0]
      this.replyMessages=this.replyArray['questionAndAnswerNotes']
      this.question=data['data']['data'][0];
      this.parentId=this.question['questionAndAnswerNotes'][0].id
      if(this.question['questionAndAnswerNotes'][0]!=undefined)
      {
        this.saveMessage=this.question['questionAndAnswerNotes'][0].message


      }
    })
  }
postQuestion()
{

  this.questionService.askQuestion({
    "message": this.questionTag.nativeElement.innerHTML,
    "notesId":this.questionNotes
    }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    this.saveMessage=this.questionTag
})
}

like(likeId)
{

  this.questionService.likes(likeId,{
    "like":true
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    this.likeHide=1;
})
}

unLike(likeId)
{
  this.questionService.likes(likeId,{
    "like":false
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    this.likeHide=0;
})
}

rating(index,event)
{
  this.questionService.rate(index.id,{
    "rate":event
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
})
}

postReply()
{
  this.likeId = this.question['questionAndAnswerNotes'][0].id
  this.questionService.replyQuestion(this.likeId,{
    "message":this.reply.nativeElement.innerHTML,
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    let messages=this.reply.nativeElement.innerHTML;
    this.display=1;
})
}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
