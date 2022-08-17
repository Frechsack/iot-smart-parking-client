import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  constructor(
    private readonly client: HttpClient
  ) { }

  public getDevices(nr: number, page?: number, pageSize?: number): Observable<string[]> {
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<string[]>(`${environment.backendUrl}/parking-lots/${nr}/devices`,{ params: param });
  }
}
