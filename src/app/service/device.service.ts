import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeviceDto } from '../dto/device-dto';
import { environment } from '../../environments/environment';
import { DeviceStatusDto } from '../dto/device-status-dto';
import { DeviceInstructionDto } from '../dto/device-instruction-dto';
import { PaginationDto } from '../dto/pagination-dto';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private readonly client: HttpClient
  ) { }

  public get(mac: string): Observable<DeviceDto>{
    return this.client.get(`${environment.backendUrl}/devices/${mac}`).pipe(
      map(it => DeviceDto.from(it))
    );
  }

  public getAll(page?: number, pageSize?: number): Observable<PaginationDto<DeviceDto>>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<PaginationDto<DeviceDto>>(`${environment.backendUrl}/devices`,{ params: param }).pipe(
          map(it => new PaginationDto(it.count, it.data.map(it => DeviceDto.from(it))))
    );
  }

  public getStatus(mac: string, page?: number, pageSize?: number): Observable<PaginationDto<DeviceStatusDto>>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<PaginationDto<DeviceStatusDto>>(`${environment.backendUrl}/devices/${mac}/status`,{ params: param }).pipe(
        map(it => new PaginationDto(it.count, it.data.map(it => DeviceStatusDto.from(it))))
    );
  }

  public getInstructions(mac: string, page?: number, pageSize?: number): Observable<PaginationDto<DeviceInstructionDto>>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<PaginationDto<DeviceInstructionDto>>(`${environment.backendUrl}/devices/${mac}/instructions`,{ params: param }).pipe(
          map(it => new PaginationDto(it.count, it.data.map(it => DeviceInstructionDto.from(it))))
    );
  }
}
