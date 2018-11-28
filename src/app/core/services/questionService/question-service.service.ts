import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http:HttpService) { }

  askQuestion(body)
  {
    return this.http.jsonPost('/questionAndAnswerNotes/addQuestionAndAnswer',body)
  }

}
