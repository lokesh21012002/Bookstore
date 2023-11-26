import { LoaderService } from './../loader/loader.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private allbookSubject = new BehaviorSubject<any>([]);
  public bookData$ = this.allbookSubject.asObservable();

  private searchbookSubject = new BehaviorSubject<any>([]);
  public searchbookData$ = this.searchbookSubject.asObservable();

  constructor(private loaderservice : LoaderService,private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getAllBooksApi() {
    try{
      this.loaderservice.showLoader();
      this.http.get("http://localhost:8000/api/v1/book/bookapi/", { 'observe': 'response' }).subscribe((response) => {
  
        const httpresponse = response;
  
        if (httpresponse.status !== 200) {
          this.toastr.error('An unexpected error occurred while fetching books.', 'Error');
          return;
        }
  
        const jsondata: any = httpresponse.body;
        const books = jsondata.data;
  
        this.allbookSubject.next(books);
  
        localStorage.setItem('bookData', JSON.stringify(books));
  
      }, error => {
        this.toastr.error('An unexpected error occurred while fetching books.', 'Error');
        console.error(error);
      });
    }
    finally{
      this.loaderservice.hideLoader();
    }
  }

  getBookByIdApi(id: number) {
    try{
      const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());
      return this.http.get(url, { 'observe': 'response' });
    }
    finally{
      this.loaderservice.hideLoader();
    }
  }

  createBookApi(data: any, token: any) {
    let formData = new FormData();

    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('price', data.price);
    formData.append('totalsold', data.totalsold);
    formData.append('totalavailable', data.totalavailable);
    formData.append('genre', data.genre);
    formData.append('cover', data.cover);

    if (!data.title || !data.author || !data.price || !data.totalsold || !data.totalavailable || !data.genre || !data.cover) {
      this.toastr.error('Please fill in all required fields.', 'Error');
      return;
    }
    this.loaderservice.showLoader();
    this.http.post("http://localhost:8000/api/v1/book/bookapi/", formData, { observe: 'response', headers: { 'Authorization': 'Bearer ' + token } }).subscribe((response) => {

      const httpresponse = response;

      if (httpresponse.status !== 200) {
        this.toastr.error('An unexpected error occurred while creating the book.', 'Error');
        this.loaderservice.hideLoader();
        return;
      }
      this.loaderservice.hideLoader();
      this.router.navigate(['Home/MyBooks']);
      this.toastr.success('Book created successfully.', 'Success');

    }, error => {
      this.loaderservice.hideLoader();
      this.toastr.error('An unexpected error occurred while creating the book.', 'Error');
      console.error(error);
    });
  }

  getSellerBooksApi(token: any) {
    try{
      this.loaderservice.showLoader();
      return this.http.get("http://localhost:8000/api/v1/book/bookapi/seller/", { headers: { 'Authorization': 'Bearer ' + token }, 'observe': 'response' });
    }
    finally{
      this.loaderservice.hideLoader();
    }
  }

  editBookApi(id: number, data: any, token: any) {
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());

    let formData = new FormData();

    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.author) {
      formData.append('author', data.author);
    }
    if (data.price) {
      formData.append('price', data.price);
    }
    if (data.totalsold) {
      formData.append('totalsold', data.totalsold);
    }
    if (data.totalavailable) {
      formData.append('totalavailable', data.totalavailable);
    }
    if (data.genre) {
      formData.append('genre', data.genre);
    }
    if (data.cover) {
      formData.append('cover', data.cover);
    }

    if (!data.title && !data.author && !data.price && !data.totalsold && !data.totalavailable && !data.genre && !data.cover) {
      this.toastr.error('Please provide at least one field to update.', 'Error');
      return;
    }

    this.loaderservice.showLoader();

    this.http.put(url, formData, { headers: { 'Authorization': 'Bearer ' + token }, 'observe': 'response' }).subscribe((response) => {
      this.loaderservice.hideLoader();
      this.router.navigate(['Home/MyBooks']);
      this.toastr.success('Book updated successfully.', 'Success');
    }, error => {
      this.loaderservice.hideLoader();
      this.toastr.error('An unexpected error occurred while updating the book.', 'Error');
      console.error(error);
    });
  }

  getSearchBooksApi(searchQuery: any) {
    const url1 = `http://localhost:8000/api/v1/book/bookapi/?genre=${searchQuery}`;
    const url2 = `http://localhost:8000/api/v1/book/bookapi/?title=${searchQuery}`;
    const url3 = `http://localhost:8000/api/v1/book/bookapi/?author=${searchQuery}`;

    let flag = 0;

    this.loaderservice.showLoader();

    this.http.get(url1, { 'observe': 'response' }).subscribe((response) => {

      const httpresponse: any = response;
      if (httpresponse.status !== 200) {
        this.loaderservice.hideLoader();
        return;
      }
      const jsondata: any = httpresponse.body;
      this.searchbookSubject.next(jsondata.data)

      if (jsondata.data.length > 0)
        flag = 1

    })

    if (flag === 0) {

      this.http.get(url2, { 'observe': 'response' }).subscribe((response) => {

        const httpresponse: any = response;
        if (httpresponse.status !== 200) {
          this.loaderservice.hideLoader();
          return;
        }
        const jsondata: any = httpresponse.body;

        this.searchbookSubject.next(jsondata.data)

        if (jsondata.data.length > 0)
          flag = 1

      })
    }

    if (flag === 0) {

      this.http.get(url3, { 'observe': 'response' }).subscribe((response) => {

        const httpresponse: any = response;
        if (httpresponse.status !== 200) {
          this.loaderservice.hideLoader();
          return;
        }
        const jsondata: any = httpresponse.body;
        this.searchbookSubject.next(jsondata.data)

        if (jsondata.data.length > 0)
          flag = 1
      })
    }
    this.loaderservice.hideLoader();
  }

  deleteBookApi(id: number, token: any) {
    this.loaderservice.showLoader();
    const url = "http://localhost:8000/api/v1/book/bookapi/{id}".replace("{id}", id.toString());

    this.http.delete(url, { headers: { 'Authorization': 'Bearer ' + token }, 'observe': 'response' }).subscribe((response) => {
      if (response.status !== 200) {
        this.toastr.error('An unexpected error occurred while deleting the book.', 'Error');
        this.loaderservice.hideLoader();
        return;
      }
      this.toastr.success('Book deleted successfully.', 'Success');
      this.loaderservice.hideLoader();
      this.router.navigate(['Home/MyBooks']);

    }, error => {
      this.loaderservice.hideLoader();
      this.toastr.error('An unexpected error occurred while deleting the book.', 'Error');
      console.error(error);
    });
  }

}
