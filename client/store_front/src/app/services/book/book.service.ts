import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private allbookSubject = new BehaviorSubject<any>([])
  public bookData$ = this.allbookSubject.asObservable()

  constructor(private http : HttpClient) { }

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

}
