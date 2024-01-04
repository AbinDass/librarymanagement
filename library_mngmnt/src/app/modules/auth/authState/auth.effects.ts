import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { user, userData } from 'src/app/models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class authEffects {

    constructor(
        private action$: Actions,
        private auth: AuthService,
        private router: Router,
        private store: Store
    
      ) {}

      signupRequest = createEffect(() => {
        return this.action$.pipe(
          ofType(AuthActions.signUpRequested),
          switchMap((signupdata: user) => {
            return this.auth.register(signupdata).pipe(
              map((data) => {
                let res = { user: data.user, token: data.token };
                window.localStorage.setItem('token', res.token)
                window.localStorage.setItem('userid', res.user._id!)
                window.localStorage.setItem('userrole', res.user.role!)
                if(res.user.role === 'user') this.router.navigate(['userhome']);
                else this.router.navigate(['admin'])
                return AuthActions.signUpSuccess(res);
              })
            );
          })
        );
      });


      loginRequest = createEffect(() => {
        return this.action$.pipe(
          ofType(AuthActions.loginRequested),
          switchMap((logindata: { email: string; password: string }) => {
            return this.auth.login(logindata).pipe(
              map((data) => {
                let res = { user: data.user, token: data.token };
                window.localStorage.setItem('token', res.token)
                window.localStorage.setItem('userid', res.user._id!)
                window.localStorage.setItem('userrole', res.user.role!)
                if(res.user.role === 'admin') this.router.navigate(['admin']);
                else this.router.navigate(['userhome'])
                return AuthActions.loginSuccess(res);
              })
            );
          })
        );
      });
}
