import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tokenSelector } from './modules/auth/authState/auth.selector';

export const authGuardGuard: CanActivateFn = (route, state) => {
  let isLogin = localStorage.getItem(`token`);
  const store = inject(Store);
  const router = inject(Router);
  let isAuth$ = store.select(tokenSelector);
  return new Promise<boolean>((resolve, reject) => {
    isAuth$.subscribe((data) => {
      if (data) resolve(true);
      else {
        resolve(false);
        router.navigate(['/login']);
      }
    });
  });
};



export const signGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  let isAuth$ = store.select(tokenSelector);
  let userRole = localStorage.getItem('userrole')
  return new Promise<boolean>((resolve, reject) => {
    isAuth$.subscribe((data) => {
      if (!data) resolve(true);
      else {
        if(userRole === 'user'){
          router.navigate(['userhome']);
        }else if (userRole === 'admin'){
          router.navigate(['admin']);

        }
        resolve(false);
      }
    });
  });
};