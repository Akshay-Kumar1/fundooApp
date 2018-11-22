import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})

// <---------------------User Services------------->
export class UserserviceService {

  constructor(private http:HttpService) { }

  postData(body) {
    return this.http.postService('/user/userSignUp',body);
  }
  resetPost(body)
  {
    return this.http.postReset('/user/reset',body);
  }
  getData()
  {
    return this.http.getService('/user/service');
  }
  pushTokens(body)
  {
    return this.http.jsonPost('/user/registerPushToken',body)
  }
  postLogin(body)
  {
    return this.http.postService('/user/login',body)
  }
  logout()
  {
    return this.http.postLogout('/user/logout')
  }
  resetPassword(body)
  {
    return this.http.resetConfig("/user/reset-password",body)
  }
  usersSearch(body)
  {
    return this.http.jsonPost("/user/searchUserList",body)
  }
}
