import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account/account.service';

export const userauthGuard: CanActivateFn = (route, state) => {
  
  const accountService = inject(AccountService);
  let isLoggedIn = false;
  accountService.isUserLoggedIn$.subscribe((data) => {
    isLoggedIn = data
  })
  
  return isLoggedIn;

};
