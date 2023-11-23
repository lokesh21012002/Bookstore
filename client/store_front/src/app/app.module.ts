import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './common/home/home.component';
import { UserauthComponent } from './userauth/userauth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { ShowbookComponent } from './book/showbook/showbook.component';
import { BookformComponent } from './book/bookform/bookform.component';
import { MybooksComponent } from './common/home/mybooks/mybooks.component';
import { CartComponent } from './common/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserauthComponent,
    BookComponent,
    ShowbookComponent,
    BookformComponent,
    MybooksComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
