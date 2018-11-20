import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../authGuard/auth-service.service' 
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor(private auth:AuthServiceService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.LoggedIn())
      {
        return true;
      }
      else
      {
         this.router.navigate(['login']);
         return false;
      }
  }
}
