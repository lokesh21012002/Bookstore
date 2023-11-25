import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../models/datatype';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerApi(data: any) {
    const userdata = data.userdata;
    const roledata = data.roledata;

    if (!userdata.email || !userdata.name || !userdata.password || !userdata.password2) {
      this.toastr.error('Please fill in all required fields', 'Error');
      return;
    }

    if (userdata.role === 'Buyer') {
      if (!roledata.city || !roledata.state || !roledata.country || !roledata.landmark) {
        this.toastr.error('Buyer details are incomplete', 'Error');
        return;
      }
    } else if (userdata.role === 'Seller') {
      if (!roledata.storename || !roledata.totalproductsold) {
        this.toastr.error('Seller details are incomplete', 'Error');
        return;
      }
    }

    this.http.post('http://localhost:8000/api/v1/account/register/', data, { observe: 'response' }).subscribe(
      (response) => {
        const httpresponse: any = response;

        if (httpresponse.status !== 200) {
          this.toastr.error('Registration failed. Please try again.', 'Error');
          return;
        }

        const jsondata: any = httpresponse.body;
        const user = jsondata.user;

        this.loginSubject.next(user);
        this.isUserLoggedInSubject.next(true);
        this.tokenSubject.next(jsondata.token.access);

        localStorage.setItem('token', jsondata.token.access);
        localStorage.setItem('loginData', JSON.stringify(user));

        this.toastr.success('Registration successful', 'Success');
        this.router.navigate(['Home']);
      },
      (error) => {
        this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
        console.error(error);
      }
    );
  }
  loginApi(data: login) {
    if (!data.email || !data.password) {
      this.toastr.error('Please enter both email and password', 'Error');
      return;
    }

    this.http.post('http://localhost:8000/api/v1/account/login/', data, { observe: 'response' }).subscribe(
      (response) => {
        const httpresponse: any = response;

        if (httpresponse.status !== 200) {
          this.toastr.error('Invalid email or password', 'Error');
          return;
        }

        const jsondata: any = httpresponse.body;
        const user = jsondata.user;

        this.loginSubject.next(user);
        this.isUserLoggedInSubject.next(true);
        this.tokenSubject.next(jsondata.token.access);

        localStorage.setItem('token', jsondata.token.access);
        localStorage.setItem('loginData', JSON.stringify(user));

        this.toastr.success('Login successful', 'Success');

        this.router.navigate(['Home']);
      },
      (error) => {
        this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
        console.error(error);
      }
    );
}


  logoutApi() {
    this.loginSubject.next({});
    this.isUserLoggedInSubject.next(false);
    this.tokenSubject.next('');
    localStorage.clear();
    this.toastr.success('See you later', 'Success');
  }

}
