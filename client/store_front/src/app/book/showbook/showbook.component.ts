import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-showbook',
  templateUrl: './showbook.component.html',
  styleUrl: './showbook.component.css'
})
export class ShowbookComponent implements OnInit{

  bookData: any = {};
  isLoggedIn: boolean = false;

  constructor(private bookservice : BookService, private route : ActivatedRoute, private router : Router, private accountservice : AccountService) {}

  ngOnInit(): void {

    this.route.params.subscribe((data) => {
      const id = data['id'];
      this.bookservice.getBookByIdApi(id).subscribe((response) => {
        const httpresponse = response;
  
        if(httpresponse.status === 200){
          const jsondata: any = httpresponse.body;
          const data = jsondata.data;
          this.bookData = data;
        }
      })
    })

    this.accountservice.isUserLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data
    })

  }

  checkOut(){
    this.router.navigate([""]);
  }

}
