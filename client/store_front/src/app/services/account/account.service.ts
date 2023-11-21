import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../../interfaces/datatype';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<any>({});
  userApiData$: Observable<any> = this.userSubject.asObservable();

  constructor(private http : HttpClient, private router : Router) { }
  
  registerAPI(data : any){

    const userdata = data.userdata
    const roledata = data.roledata
    
    if (!userdata.email || !userdata.name || !userdata.password || !userdata.password2) {
      return;
    }

    if (userdata.role === "Buyer") {
      if (!roledata.city || !roledata.state || !roledata.country || !roledata.landmark) {
        return;
      }
    } else if (userdata.role === "Seller") {
      if (!roledata.storename || !roledata.totalproductsold) {
        return;
      }
    }

    this.http.post('http://localhost:8000/api/v1/account/register/', data).subscribe((response) => {
      console.log(response)})
  }

  loginAPI(data : login){
    
    if (!data.email || !data.password) {
      return;
    }

    return this.http.post("http://localhost:8000/api/v1/account/login/", data, { 'observe' : 'response' }).subscribe((response) => {
      const httpresponse: any = response
      if(httpresponse.status){
        const jsondata = httpresponse.body
        const accesstoken = jsondata.token.access
        localStorage.setItem("token", accesstoken);
        localStorage.setItem("user", JSON.stringify(jsondata.user));
        this.isLoggedInSubject.next(true);
        this.userSubject.next(jsondata.user);
        this.router.navigate(["/Home"]);
      }
    });
  }

  logOutAPI(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.isLoggedInSubject.next(false);
    this.userSubject.next({});
    this.router.navigate(["/"]);
  }

}
