import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  isAuth:boolean=false;
  authSubject=new Subject<boolean>();
  constructor() { }
   
  isAuthenticated(): boolean{
    return this.isAuth;
  }
  signIn(){
    this.isAuth=true;
    this.authSubject.next(this.isAuthenticated())
  }
  signOut(){
    this.isAuth=false;
    this.authSubject.next(this.isAuthenticated())
  }

}
