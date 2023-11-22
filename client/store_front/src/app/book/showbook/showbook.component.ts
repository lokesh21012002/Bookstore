import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showbook',
  templateUrl: './showbook.component.html',
  styleUrl: './showbook.component.css'
})
export class ShowbookComponent implements OnInit{

  bookData: any = {};

  constructor(private bookservice : BookService, private route : ActivatedRoute, private router : Router) {}

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

  }

  checkOut(){
    this.router.navigate([""]);
  }

}
