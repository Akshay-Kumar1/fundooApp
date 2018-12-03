import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http:HttpService) { }

  askQuestions(body)
  {
    return this.http.jsonPost('/questionAndAnswerNotes/addQuestionAndAnswer',body)
  }
  likes(id,body)
  {
    return this.http.jsonPost('/questionAndAnswerNotes/like/'+id+'',body)
  }
  replyQuestion(id,body)
  {
    return this.http.jsonPost('/questionAndAnswerNotes/reply/'+id+'',body)
  }
  rate(id,body)
  {
    return this.http.jsonPost('/questionAndAnswerNotes/rate/'+id+'',body) 
  }

}
