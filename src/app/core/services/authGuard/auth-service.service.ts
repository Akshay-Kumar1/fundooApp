import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  LoggedIn()
  {
    return localStorage.getItem('token')!=null;
  }
}
