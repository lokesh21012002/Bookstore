import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserauthComponent } from './userauth/userauth.component';
import { HomeComponent } from './common/home/home.component';
import { userauthGuard } from './guard/userauth.guard';
import { BookComponent } from './book/book.component';
import { ShowbookComponent } from './book/showbook/showbook.component';
import { BookformComponent } from './book/bookform/bookform.component';
import { MybooksComponent } from './common/home/mybooks/mybooks.component';

const routes: Routes = [
  {
    path : "",
    component : UserauthComponent
  },
  {
    path : "Home",
    component : HomeComponent,
  },
  {
    path : "Home/AddBook",
    component : BookformComponent,
  },
  {
    path : "Home/MyBooks",
    component : MybooksComponent,
  },
  {
    path : "Book",
    component : BookComponent,
  },
  {
    path : "Book/:id",
    component : ShowbookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
