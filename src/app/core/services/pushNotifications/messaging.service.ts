import { Injectable } from '@angular/core';  
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn:'root'
})

@Injectable()
export class MessagingService {

  messaging;
  currentMessage = new BehaviorSubject(null)

  constructor() {
    firebase.initializeApp({
        'messagingSenderId': '263147610417'
      })
      this.messaging=firebase.messaging()
   }


  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        return this.messaging.getToken()
      }) 
      .then(pushToken => {
        localStorage.setItem('pushToken',pushToken);
        
      })
      .catch((err) => {
      });
    }
    receiveMessage() {
        this.messaging.onMessage((payload) => {
         this.currentMessage.next(payload)
       });
 
     }

}