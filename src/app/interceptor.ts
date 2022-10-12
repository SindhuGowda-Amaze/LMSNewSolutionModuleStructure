import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  authReq: any
  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    let token1: any = localStorage.getItem('token');
    const token: any = (token1);
    let toekn: any = localStorage.getItem('antiforgerytoken');
    const antitoken = atob(toekn);

    const cookietoken = localStorage.getItem('cookietoken');


    // Clone the request to add the new header.
    // debugger;

    // const headers = new HttpHeaders({
    //   'Authorization': `${token}`,
    //   'XSRF-TOKEN': `${token}`,
    //   'Cookie': 'xsrf-token=' + `${token}`,
    // });


    if (req.url.includes('Authenicate') == true) {
      this.authReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      })
    } else  {
        this.authReq = req.clone({
            headers: req.headers.set('Authorization', `${token}`),
          })
    }
  
    // const authReq = req.clone({

    //   headers: req.headers.set('Authorization', `${token}`),



    // });

    // debugger;
    next.handle(req);
    debugger;
    // console.log('Sending request with new header now ...');

    //send the newly created request
    return next.handle(this.authReq).pipe(
      catchError(err => {
        console.log('Error Occurred');
        console.log(err);
        throw new Error(err);
      })) as any

  }
}



{ }



