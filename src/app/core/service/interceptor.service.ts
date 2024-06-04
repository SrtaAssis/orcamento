import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable< HttpEvent<any> > {
    // const usuario: UsuarioModel = this.appStorageService.getUsuarioData();
    // const Authorization: string = usuario && usuario.token ? usuario.token : '';

    const secureReq = req.clone({
      setHeaders: {
        'Authorization': ''
      }
    });

    // return next.handle(secureReq);
    return next.handle(secureReq).pipe(catchError(x=> this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70

  }
  
  httpCallNeedsToken(req: HttpRequest<any>): boolean {
    const urls: string[] = [
      // environment.URLS.autenticacao.login
    ];
    const resultado: string | undefined = urls.find((url: string) => req.url.includes(url)) ;
    return resultado && resultado.trim().length ? false : true;
  }
  
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      // this.navigator.login();
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(() => err);
  }
}
