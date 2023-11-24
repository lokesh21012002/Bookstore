import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private allbookSubject = new BehaviorSubject<any>([])
  public bookData$ = this.allbookSubject.asObservable()

  private searchbookSubject = new BehaviorSubject<any>([])
  public searchbookData$ = this.searchbookSubject.asObservable()

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

      localStorage.setItem('bookData', JSON.stringify(books));

    })
  }

  getBookByIdApi(id : number){
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());
    return this.http.get(url, {'observe' : 'response'});
  }

  createBookApi(data : any, token: any){

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

      const httpresponse = response;

      if(httpresponse.status !== 201) {
        return;
      }

      this.router.navigate(['Home/MyBooks']);

    })
  }

  getSellerBooksApi(token: any){
    
    return this.http.get("http://localhost:8000/api/v1/book/bookapi/seller/", {headers : {
      'Authorization' : 'Bearer ' + token,
    }, 'observe' : 'response'});

  }

  editBookApi(id : number, data : any, token : any){
    
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());

    let formData = new FormData();

    if(data.title){
      formData.append('title', data.title);
    }
    if(data.author){
      formData.append('author', data.author);
    }
    if(data.price){
      formData.append('price', data.price);
    }
    if(data.totalsold){
      formData.append('totalsold', data.totalsold);
    }
    if(data.totalavailable){
      formData.append('totalavailable', data.totalavailable);
    }
    if(data.genre){
      formData.append('genre', data.genre);
    }
    if(data.cover){
      formData.append('cover', data.cover);
    }

    console.warn("HELLo");
    

    this.http.put(url, formData, {headers : {
      'Authorization' : 'Bearer ' + token,
    }, 'observe' : 'response'}).subscribe((response) => {
      this.router.navigate(['Home/MyBooks']);
    })

  }

  getSearchBooksApi(searchQuery : any){

    const url1 = `http://localhost:8000/api/v1/book/bookapi/?genre=${searchQuery}`;
    const url2 = `http://localhost:8000/api/v1/book/bookapi/?title=${searchQuery}`;
    const url3 = `http://localhost:8000/api/v1/book/bookapi/?author=${searchQuery}`;

    let flag = 0;

    this.http.get(url1, {'observe' : 'response'}).subscribe((response) => {

      const httpresponse: any = response;
      if(httpresponse.status !== 200) {
        return;
      }
      const jsondata: any = httpresponse.body;
      this.searchbookSubject.next(jsondata.data)

      if(jsondata.data.length > 0)
        flag = 1

    })

    if(flag === 0){

      this.http.get(url2, {'observe' : 'response'}).subscribe((response) => {

        const httpresponse: any = response;
        if(httpresponse.status !== 200) {
          return;
        }
        const jsondata: any = httpresponse.body;
        
        this.searchbookSubject.next(jsondata.data)

        if(jsondata.data.length > 0)
          flag = 1

    })}

    if(flag === 0){

      this.http.get(url3, {'observe' : 'response'}).subscribe((response) => {

        const httpresponse: any = response;
        if(httpresponse.status !== 200) {
          return;
        }
        const jsondata: any = httpresponse.body;
        this.searchbookSubject.next(jsondata.data)

        if(jsondata.data.length > 0)
          flag = 1
    })}

  }

  deleteBookApi(id : number, token: any){
    
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());

    this.http.delete(url, {headers : {
      'Authorization' : 'Bearer ' + token,
    }, 'observe' : 'response'}).subscribe((response) => {

    this.router.navigate(['Home/MyBooks']);
  
  })
  
  }

}
