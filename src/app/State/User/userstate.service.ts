import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, StoreConfig } from '@datorama/akita';
import { Observable, ReplaySubject, last, lastValueFrom, mergeMap } from 'rxjs';
import { UserQuery } from './user.query';
import { UserStore } from './user.store';
import { User } from './user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserStateService {
  
  constructor( private userStore: UserStore,private userQuery:UserQuery,private authService:AuthenticationService,private cookieService:CookieService) {}


  addUser(user:User){
    this.userStore.add(user);

  };
  async getUser(){
    if(this.authService.getUserId()){
      let user = this.userQuery.getEntity(this.authService.getUserId()||'');

      if(user){
        console.log("***************** USER STATE")
        return user;

      }else{
        let token = this.cookieService.get("accessToken");

        if(token){

       token = token.replace(/['"]+/g, '');
        user = await this.fetchUser(token);
        if(user){
          this.addUser(user);
          console.log("***************** USER API")

        }

        return user;
      }
      }

    }
    return null;

  }


 


  
 

  
  getAllUsers(){
    return this.userQuery.getAll();
  }

   update(id:string|number, User: Partial<User>) {
   this.userStore.update(id, User);
  }

  findById(id:string|number){
    return this.userQuery.getEntity(id);

  }
  remove() {
    this.userStore.remove(1);
  }
  
  isUserLoggedIn():boolean{
  return Boolean(localStorage.getItem('login'));

  }
  setUserLoggedIn(status:boolean){
    localStorage.setItem('login', status+'');
  }

  getUserName(){
    let user:any = this.userQuery.getEntity(this.authService.getUserId()||'');
    if(user){
    let dName = user.firstName;
    if (!this.authService.IsNullOrEmpty(user.middleName)) {
      dName = `${dName} ${user.middleName}`;
    } else if (!this.authService.IsNullOrEmpty(user.lastName)) {
      dName = `${dName} ${user.lastName}`;
    }
    return dName;
  }
  return '';
  }
  getUserRole():string{
    let user:any = this.userQuery.getEntity(this.authService.getUserId()||'');
    return user?.role || "";
  }

  
 

 async  fetchUser(accessToken:string){
      let user = null;
      let tokenReq =  this.authService.verifyToken(environment.app,accessToken,'body');
      user = (await lastValueFrom(tokenReq));
  console.log(user);
  user = user.data;
      return user;


  }


}