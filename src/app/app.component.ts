import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/services/pushNotifications/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isLeftVisible=true;
  private title = 'fundooNotes';
  constructor(private msgService: MessagingService){}
ngOnInit()
{
  this.msgService.getPermission()
  this.msgService.receiveMessage()

}
}