import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

createOrderApi(data: any, token: any) {
  this.http.post("http://localhost:8000/api/v1/account/order/", data, { observe: 'response', headers: { 'Authorization': 'Bearer ' + token } }).subscribe(
    (response) => {
      if (response.status !== 200) {
        this.toastr.error('Order creation failed', 'Error');
        return;
      }

      this.router.navigate(['Home/MyBooks']);
      this.toastr.success('Order created successfully', 'Success');
    },
    (error) => {
      this.toastr.error('Order creation failed', 'Error');
      console.error(error);
    }
  );
}

getOrdersApi(token: any) {
  const url = "http://localhost:8000/api/v1/account/order";

  return this.http.get(url, { 'observe': 'response', headers: { 'Authorization': 'Bearer ' + token } }).pipe(
    catchError(error => {
      this.toastr.error('Failed to fetch orders', 'Error');
      console.error(error);
      throw error;
    })
  );
}

updateOrderApi(data: any, token: any, id: number) {
  const url = `http://localhost:8000/api/v1/account/order/${id}/`;

  this.http.put(url, data, { 'observe': 'response', headers: { 'Authorization': 'Bearer ' + token } }).subscribe(
    (response) => {
      if (response.status !== 200) {
        this.toastr.error('Order update failed', 'Error');
        return;
      }

      this.toastr.success('Order updated successfully', 'Success');
      console.warn(response);
    },
    (error) => {
      this.toastr.error('Order update failed', 'Error');
      console.error(error);
    }
  );
}

deleteOrderApi(id: number, token: any) {
  const url = `http://localhost:8000/api/v1/account/order/${id}/`;

  this.http.delete(url, { 'observe': 'response', headers: { 'Authorization': 'Bearer ' + token } }).subscribe(
    (response) => {
      if (response.status !== 200) {
        this.toastr.error('Order deletion failed', 'Error');
        return;
      }

      this.toastr.success('Order deleted successfully', 'Success');
      console.warn(response);
    },
    (error) => {
      this.toastr.error('Order deletion failed', 'Error');
      console.error(error);
    }
  );
}

getInvoiceApi(id: number, token: any) {
  const url = `http://localhost:8000/api/v1/account/bill/${id}/`;

  this.http.get(url, {
    headers: { 'Authorization': 'Bearer ' + token },
    observe: 'response',
    responseType: 'blob',
  }).subscribe(
    (response) => {
      if (response.status !== 200) {
        this.toastr.error('Failed to fetch invoice', 'Error');
        return;
      }

      const json: any = response;
      const blob = new Blob([json.body], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    },
    (error) => {
      this.toastr.error('Failed to fetch invoice', 'Error');
      console.error(error);
    }
  );
}


}
