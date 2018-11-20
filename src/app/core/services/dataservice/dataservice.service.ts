import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService 
{
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable(); 
  labelObservable = this.messageSource.asObservable();
  viewObservable=this.messageSource.asObservable();
  private msgSource = new BehaviorSubject(false);
  currentMsg = this.msgSource.asObservable();
  constructor() { }
    changeMessage(message: string) 
    {
    this.messageSource.next(message) 
    }
    observeLabel(message: boolean) 
    {
    this.messageSource.next(message) 
    }
    observeView(message:boolean)
    {
      this.messageSource.next(message)
    }
    changeMsg(message: boolean) 
    {
      this.msgSource.next(message);
    }
}
