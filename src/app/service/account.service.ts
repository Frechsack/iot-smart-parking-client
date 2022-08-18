import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountDto } from '../dto/account-dto';
import { PaginationDto } from '../dto/pagination-dto';
import { PaymentDto } from '../dto/payment-dto';

export const AUTHENTICATION_TOKEN_NAME = 'bearer';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private readonly client: HttpClient,
    private readonly cookieService: CookieService
  ) { }

  public addPlate(email: string, plate: string): Observable<void> {
    return this.client.post(`${environment.backendUrl}/accounts/${email}/plates`, {} , { params: { plate: plate }}).pipe(
      map(() => {})
    );
  }

  public removePlate(email: string, plate: string): Observable<void> {
    return this.client.delete(`${environment.backendUrl}/accounts/${email}/plates` , { params: { plate: plate }}).pipe(
      map(() => {})
    );
  }

  public authenticate(email: string, password: string): Observable<string> {
    return this.client.post(`${environment.backendUrl}/accounts/${email}/authenticate`,{}, { params: { password: password }, responseType: 'text'})
    .pipe(tap(it => this.cookieService.set(AUTHENTICATION_TOKEN_NAME,it)));
 }

  public getPayments(email: string, plate: string, page?: number, pageSize?: number): Observable<PaginationDto<PaymentDto>>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<PaginationDto<PaymentDto>>(`${environment.backendUrl}/accounts/${email}/plates/${plate}` , { params: param }).pipe(
      map(it => new PaginationDto(it.count, it.data.map(it => PaymentDto.from(it))))
    );
  }

  public getAccount(email: string): Observable<AccountDto>{
    return this.client.get<AccountDto>(`${environment.backendUrl}/accounts/${email}`).pipe(
      map(it => AccountDto.from(it))
    );
  }

public getThisAccount(): Observable<AccountDto>{
  return this.getAccount('this')
}

  public registerAccount(email: string,
     password?: string,
     firstname?: string,
     lastname?: string,
     zip?: string,
     street?: string,
     streetNr?: string
   ): Observable<void> {
     let param = new HttpParams();
     if(email) param = param.set('email', email);
     if(password) param = param.set('password', password);
     if(firstname) param = param.set('firstname', firstname);
     if(zip) param = param.set('zip', zip);
     if(lastname) param = param.set('lastname', lastname);
     if(street) param = param.set('street', street);
     if(streetNr) param = param.set('streetNr', streetNr);
     return this.client.post(`${environment.backendUrl}/accounts`,{},{ params: param }).pipe(
       map(() => { return })
     );
  }

  public updateAccount(email: string,
     password?: string,
     firstname?: string,
     lastname?: string,
     zip?: string,
     street?: string,
     streetNr?: string
   ): Observable<void> {
     let param = new HttpParams();
     if(password) param = param.set('password', password);
     if(firstname) param = param.set('firstname', firstname);
     if(zip) param = param.set('zip', zip);
     if(lastname) param = param.set('lastname', lastname);
     if(street) param = param.set('street', street);
     if(streetNr) param = param.set('streetNr', streetNr);
     return this.client.put(`${environment.backendUrl}/accounts/${email}`,{},{ params: param }).pipe(
       map(() => { return })
     );
  }
}
