import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient, private router : Router) { }

  createOrderApi(data : any, token : any){
    
    this.http.post("http://localhost:8000/api/v1/account/order/", data, {observe : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {

      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      this.router.navigate(['Home/MyBooks']);

    })

  }

  getOrdersApi(token: any){

    const url = "http://localhost:8000/api/v1/account/order";

    return this.http.get(url, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}});

  }

  updateOrderApi(data: any, token: any){

    const url = "http://localhost:8000/api/v1/account/order/"

    this.http.put(url, data, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {
      console.warn(response);
    })

  }

  deleteOrderApi(id: number, token: any){

    const url = `http://localhost:8000/api/v1/account/order/${id}/`;

    this.http.delete(url, {'observe' : 'response', headers : {'Authorization' : 'Bearer ' + token}}).subscribe((response) => {
      console.warn(response);
    })

  }

  getInvoiceApi(id : number, token: any){
   
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
