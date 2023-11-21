import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { UserauthComponent } from './userauth/userauth.component';

const routes: Routes = [
  {
    component : UserauthComponent,
    path : ""
  },
  {
    component : HomeComponent,
    path : "Home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
