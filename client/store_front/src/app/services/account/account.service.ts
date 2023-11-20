import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../../../interfaces/datatype';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http : HttpClient) { }
  
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

    this.http.post("http://localhost:8000/api/v1/account/login/", data).subscribe((response) => {
      console.log(response)
    })
  }

}
