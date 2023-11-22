import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient, private router : Router) { }

  createOrderApi(data : any){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjgyNDcyLCJpYXQiOjE3MDA2Nzg4NzIsImp0aSI6IjZlMjU2YzQ4YmFmYzQ1N2FiZmQ3MWU4ZjQ1OWYwOGNlIiwidXNlcl9pZCI6M30.HxvVuzUg5CdiBj8rDy3hCydkVvxs54KTLVruJLdDIP8";

    this.http.post("http://localhost:8000/api/v1/account/order/", data, {observe : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {

      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      this.router.navigate(['Home/MyBooks']);

    })

  }

}
