import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bookCreation } from '../../models/datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private allbookSubject = new BehaviorSubject<any>([])
  public bookData$ = this.allbookSubject.asObservable()

  constructor(private http : HttpClient, private router : Router) { }

  getAllBooksApi(){
    this.http.get("http://localhost:8000/api/v1/book/bookapi/", {'observe' : 'response'}).subscribe((response) => {

      const httpresponse = response;

      if(httpresponse.status !== 200) {
        return;
      }

      const jsondata: any = httpresponse.body;
      const books = jsondata.data;

      this.allbookSubject.next(books);

    })
  }

  getBookByIdApi(id : number){
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());
    return this.http.get(url, {'observe' : 'response'});
  }

  createBookApi(data : any){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjYwMzUwLCJpYXQiOjE3MDA2NTY3NTAsImp0aSI6IjAxYTVmYjAwZmEwZDQzYTQ4NjYwNDFiM2JjYjdjMGZlIiwidXNlcl9pZCI6Mn0.IXvRj4YrEsaKdB5Ozv_9LJ66DVCt6Ea-y4uu-74mMmA"
    
    let formData = new FormData();

    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('price', data.price);
    formData.append('totalsold', data.totalsold);
    formData.append('totalavailable', data.totalavailable);
    formData.append('genre', data.genre);
    formData.append('cover', data.cover);

    this.http.post("http://localhost:8000/api/v1/book/bookapi/", formData, {observe : 'response', headers : {
      'Authorization' : 'Bearer ' + token,
    }}).subscribe((response) => {
      console.warn(response);
    })
  }

  getSellerBooksApi(){
    
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjYwMzUwLCJpYXQiOjE3MDA2NTY3NTAsImp0aSI6IjAxYTVmYjAwZmEwZDQzYTQ4NjYwNDFiM2JjYjdjMGZlIiwidXNlcl9pZCI6Mn0.IXvRj4YrEsaKdB5Ozv_9LJ66DVCt6Ea-y4uu-74mMmA";

    return this.http.get("http://localhost:8000/api/v1/book/bookapi/seller/", {headers : {
      'Authorization' : 'Bearer ' + token,
    }, 'observe' : 'response'});

  }

  deleteBookApi(id : number){

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjU5Njg5LCJpYXQiOjE3MDA2NTYwODksImp0aSI6ImE4MDQxMDNmY2NmYzRmMTJiNjUzZWY4OWQ5YjU5YmViIiwidXNlcl9pZCI6Mn0.5Dx6EVmllnlm9zVTg-MrymmCCyhBdgqxJHclEYixzIs";

    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());

    this.http.delete(url, {headers : {
      'Authorization' : 'Bearer ' + token,
    }, 'observe' : 'response'}).subscribe((response) => {

    this.router.navigate(['Home/MyBooks']);
  
  })
  
  }

}
