import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { RatingModule} from "ngx-rating";
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
  constructor(private router:ActivatedRoute, private notesService:NoteserviceService,
    private questionService:QuestionServiceService) { }
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
  firstName = localStorage.getItem('firstName')
  email = localStorage.getItem('email')
  lastName = localStorage.getItem('lastName')
  image = localStorage.getItem('imageUrl')
  
  ownerPhoto = environment.profilePicUrl+this.image
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
      this.getUserEmail=this.getUser[0]['user'].firstName
      this.title=data['data']['data'][0].title
      this.description=data['data']['data'][0].description
      this.replyArray=data['data']['data'][0]
      this.replyMessages=this.replyArray['questionAndAnswerNotes']
      this.question=data['data']['data'][0];
      this.getProfile=this.getUser[0]['user']
      var photo = environment.profilePicUrl+this.getProfile.imageUrl
      var user = data['data']['data'][0]['questionAndAnswerNotes']['user']
      if(this.question['questionAndAnswerNotes'][0]!=undefined)
      {
        this.saveMessage=this.question['questionAndAnswerNotes'][0].message
      }
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
    this.saveMessage=questionTag
})
}

like()
{
  this.likeId = this.question['questionAndAnswerNotes'][0].id
  this.questionService.likes(this.likeId,{
    "like":true
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
  this.likeCounter=data['data']['details'].count
    this.likeHide=1;
})
}

unLike()
{
  this.likeId = this.question['questionAndAnswerNotes'][0].id
  this.questionService.likes(this.likeId,{
    "like":false
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
  this.likeCounter=data['data']['details'].count
    this.likeHide=0;
})
}

postReply(reply)
{
  this.likeId = this.question['questionAndAnswerNotes'][0].id
  this.questionService.replyQuestion(this.likeId,{
    "message":reply,
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data=>{
    this.display=1;
})
}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
