import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { bookCreation } from '../../models/datatype';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.css'
})
export class BookformComponent {

  files: any = {}
  bookData: any = {}
  id: any = ""

  constructor(private bookservice : BookService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data['id'];
    })
    if(this.id){
      this.bookservice.getBookByIdApi(this.id).subscribe((response) => {
        const json: any = response.body;
        this.bookData = json.data;
      })
    }
  }

  createBook(data: bookCreation){
    data.cover = this.files;
    this.bookservice.createBookApi(data);
  }

  updateBook(updatedata: bookCreation){
    
    let data: any = {}
    
    if(updatedata.title){
      data['title'] = updatedata.title;
    }
    if(updatedata.author){
      data['author'] = updatedata.author;
    }
    if(updatedata.price){
      data['price'] = updatedata.price;
    }
    if(updatedata.totalsold){
      data['totalsold'] = updatedata.totalsold;
    }
    if(updatedata.totalavailable){
      data['totalavailable'] = updatedata.totalavailable;
    }
    if(updatedata.genre){
      data['genre'] = updatedata.genre;
    }
    if(this.files.length > 0){
      data['cover'] = this.files;
    }
    
    this.bookservice.editBookApi(this.id, data);
}
  
  onFileSelected(e: any){
    this.files = e.target.files[0];
  }

}
