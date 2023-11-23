import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient, private router : Router) { }

  createOrderApi(data : any){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzQ1MDEzLCJpYXQiOjE3MDA3NDE0MTMsImp0aSI6IjQ4NWM5ZjA2MzNmNTRhMmZiZjNjMzE1MTE4Y2ZiYjU4IiwidXNlcl9pZCI6M30.L3n8eemFMNLWg_pR8SHIk1NQxQDjwmqqrk_2e85AcOY";

    this.http.post("http://localhost:8000/api/v1/account/order/", data, {observe : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {

      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      this.router.navigate(['Home/MyBooks']);

    })

  }

  getOrdersApi(){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzQ1MDEzLCJpYXQiOjE3MDA3NDE0MTMsImp0aSI6IjQ4NWM5ZjA2MzNmNTRhMmZiZjNjMzE1MTE4Y2ZiYjU4IiwidXNlcl9pZCI6M30.L3n8eemFMNLWg_pR8SHIk1NQxQDjwmqqrk_2e85AcOY";
    const url = "http://localhost:8000/api/v1/account/order";

    return this.http.get(url, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}});

  }

  updateOrderApi(data: any){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzQ1MDEzLCJpYXQiOjE3MDA3NDE0MTMsImp0aSI6IjQ4NWM5ZjA2MzNmNTRhMmZiZjNjMzE1MTE4Y2ZiYjU4IiwidXNlcl9pZCI6M30.L3n8eemFMNLWg_pR8SHIk1NQxQDjwmqqrk_2e85AcOY";
    const url = "http://localhost:8000/api/v1/account/order/"

    this.http.put(url, data, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {
      console.warn(response);
    })

  }

  deleteOrderApi(){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzQ1MDEzLCJpYXQiOjE3MDA3NDE0MTMsImp0aSI6IjQ4NWM5ZjA2MzNmNTRhMmZiZjNjMzE1MTE4Y2ZiYjU4IiwidXNlcl9pZCI6M30.L3n8eemFMNLWg_pR8SHIk1NQxQDjwmqqrk_2e85AcOY";
    const url = "http://localhost:8000/api/v1/account/order/"

    this.http.delete(url, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {
      console.warn(response);
    })

  }

  getInvoiceApi(id : number){
   
   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNzQ1MDEzLCJpYXQiOjE3MDA3NDE0MTMsImp0aSI6IjQ4NWM5ZjA2MzNmNTRhMmZiZjNjMzE1MTE4Y2ZiYjU4IiwidXNlcl9pZCI6M30.L3n8eemFMNLWg_pR8SHIk1NQxQDjwmqqrk_2e85AcOY";
   const url = `http://localhost:8000/api/v1/account/bill/${id}/`;

    this.http.get(url, {
      headers: { 'Authorization': 'Bearer ' + token },
      observe: 'response',
      responseType: 'blob', 
    }).subscribe(
      (response) => {
        const json: any = response;
        const blob = new Blob([json.body], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); 
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
