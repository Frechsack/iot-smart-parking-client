import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { AUTHENTICATION_TOKEN_NAME } from "../service/account.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private readonly cookieService: CookieService
  ){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.cookieService.check(AUTHENTICATION_TOKEN_NAME)){
      req = req.clone({
          headers: req.headers.set(AUTHENTICATION_TOKEN_NAME,this.cookieService.get(AUTHENTICATION_TOKEN_NAME))
        });
    }
    return next.handle(req);
  }

}
