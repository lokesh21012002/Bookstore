import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../models/datatype';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private tokenSubject = new BehaviorSubject<string>('');
  public tokenData$ = this.tokenSubject.asObservable();

  private loginSubject = new BehaviorSubject<any>({});
  public loginData$ = this.loginSubject.asObservable();

  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  constructor(private http : HttpClient, private router : Router) { }

  registerApi(data : any){

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

    this.http.post('http://localhost:8000/api/v1/account/register/', data, {observe : 'response'}).subscribe((response) => {

      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      const jsondata: any = httpresponse.body;
      const user = jsondata.user;

      this.loginSubject.next(user);
      this.isUserLoggedInSubject.next(true);
      this.tokenSubject.next(jsondata.token.access);

      localStorage.setItem('token', jsondata.token.access);
      localStorage.setItem('loginData', JSON.stringify(user));

      this.router.navigate(['Home']);

    });

  }

  loginApi(data : login){
    
    this.http.post('http://localhost:8000/api/v1/account/login/', data, {observe : 'response'}).subscribe((response) => {
      
      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      const jsondata: any = httpresponse.body;
      const user = jsondata.user;
      
      this.loginSubject.next(user);
      this.isUserLoggedInSubject.next(true);
      this.tokenSubject.next(jsondata.token.access);
      
      localStorage.setItem('token', jsondata.token.access);
      localStorage.setItem('loginData', JSON.stringify(user));

      this.router.navigate(['Home']);
    })

  }

  logoutApi(){
    this.loginSubject.next({});
    this.isUserLoggedInSubject.next(false);
    this.tokenSubject.next('');
    localStorage.clear();
  }

}
