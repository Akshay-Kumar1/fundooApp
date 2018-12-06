import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { NoteserviceService } from 'src/app/core/services/noteService/noteservice.service';
import { QuestionServiceService } from 'src/app/core/services/questionService/question-service.service';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  content: { "like": BooleanConstructor; };
  RequestBody: any;
  constructor(private route: ActivatedRoute, private notesService: NoteserviceService,
    public router: Router, public questionService: QuestionServiceService) { }
    @ViewChild('messageReply') public messageReply: ElementRef;
    @ViewChild('askAQuestion') public askAQuestion: ElementRef;
  
  private views=0  
  private checkList = [];
  private noteColor;
  private message;
  private replyId;
  private questionAnswerArray;
  private show = false;
  replyQuestion;
  private ratingAverage;
  private avgRate;
  private parentId;
  private userName;
  private userDetails;
  private img;
  private profilePic;
  private noteId;
  private title;
  private noteDescription;
  private noteDetails;
  private hideReply=0
  public editorContent: string
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteid'];
      LoggerService.log('noteDetails', this.noteId);
    });
    this.getNoteDetails();
  }
  showReplies()
  {
    this.views=1;
    this.hideReply=1;
  }
  hideReplies()
  {
    this.views=0;
    this.hideReply=0;
  }

  getNoteDetails() {
    this.notesService.questionService(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('getNoteDetail', data);
        this.userDetails = data['data']['data'][0].user;
        this.profilePic = environment.profilePicUrl;
        this.noteDetails = data['data'].data[0];
        this.title = this.noteDetails.title;
        this.noteDescription = this.noteDetails.description;

        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }

        if (this.noteDetails.questionAndAnswerNotes[0] != undefined) {
          this.message = this.noteDetails.questionAndAnswerNotes[0].message;
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          this.img == environment.profilePicUrl + this.noteDetails.questionAndAnswerNotes[0].user.imageUrl;
        }

        if (this.noteDetails.questionAndAnswerNotes != undefined) {
          this.questionAnswerArray = this.noteDetails.questionAndAnswerNotes;
          LoggerService.log('data', this.questionAnswerArray)
        }

      })
      
  }

  close() {
    this.router.navigate(['homepage/cardtemplate']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  askFirstQuestion() {
    var content = {
      'message': this.editorContent,
      'notesId': this.noteId
    } 
    this.questionService.askQuestions(content).subscribe(data => {
      this.getNoteDetails();
      this.message = data['data']['details'].message;
      this.getNoteDetails();
    })
  }

  like(value) {
    var content = {
      'like': true,
    }
    this.questionService.likes(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetails();
        
      });
    this.getNoteDetails();
  }
  ratingAnswer(value, event) {
    var content = {
      'rate': event
    }
    this.questionService.rate(value.id, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetails();
    
      })
  }

  averageRating(rateArray) {
    this.ratingAverage = 0;
    if (rateArray.length != 0) {
      for (let i = 0; i < rateArray.length; i++) 
      {
        this.ratingAverage += rateArray[i].rate
      }
      this.avgRate = this.ratingAverage / rateArray.length;
      return this.avgRate;
    }
  }

  leaveReply(value) {
    let content = {
      'message': this.editorContent
    }
    LoggerService.log(content.message);
    LoggerService.log(value);
    this.questionService.replyQuestion(value, content)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getNoteDetails();
      })
  }
  public options: Object = {
    charCounterCount: false,
    toolbarButtons:   ['fullscreen', 'bold', 'italic', 'underline', '|','fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|',
    'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'emoticons', 'fontAwesome',
    'specialCharacters', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['undo', 'redo' , '-', 'bold', 'italic', 'underline'],
    toolbarButtonsSM: ['undo', 'redo' , '-', 'bold', 'italic', 'underline']
  };

}
