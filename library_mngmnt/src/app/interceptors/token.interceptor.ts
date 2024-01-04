import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.ExludeUrl(request.url)){
      return next.handle(request)
    }
    const token  = window.localStorage.getItem('token');
    request = request.clone({
      setHeaders:{
        Authorization:token || ''
      }
    })
  
    return next.handle(request);
  }

  private ExludeUrl(url:string):boolean{
    const urls=['/login','/register']
    return urls.some((urls)=> url.includes(urls) )
  }

}
