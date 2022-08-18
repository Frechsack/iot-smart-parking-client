import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationDto } from '../dto/pagination-dto';
import { ParkingLotDto } from '../dto/parking-lot-dto';

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

  public getParkingLots(): Observable<PaginationDto<ParkingLotDto>> {
      return this.client.get<PaginationDto<ParkingLotDto>>(`${environment.backendUrl}/parking-lots/`,).pipe(
        map(it => new PaginationDto(it.count, it.data.map(it => ParkingLotDto.from(it))))
      );
  }
}
