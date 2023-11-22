import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserauthComponent } from './userauth/userauth.component';
import { HomeComponent } from './common/home/home.component';
import { userauthGuard } from './guard/userauth.guard';
import { BookComponent } from './book/book.component';
import { ShowbookComponent } from './book/showbook/showbook.component';

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
