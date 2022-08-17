import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeviceDto } from '../dto/device-dto';
import { environment } from '../../environments/environment';
import { DeviceStatusDto } from '../dto/device-status-dto';
import { DeviceInstructionDto } from '../dto/device-instruction-dto';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private readonly client: HttpClient
  ) { }

  public get(mac: string): Observable<DeviceDto>{
    return this.client.get(`${environment.production}/devices/${mac}`).pipe(
      map(it => DeviceDto.from(it))
    );
  }

  public getAll(page?: number, pageSize?: number): Observable<DeviceDto[]>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<DeviceDto[]>(`${environment.production}/devices/`,{ params: param }).pipe(
      map(it => it.map(it => DeviceDto.from(it)))
    );
  }

  public getStatus(mac: string, page?: number, pageSize?: number): Observable<DeviceStatusDto[]>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<DeviceStatusDto[]>(`${environment.production}/devices/${mac}`,{ params: param }).pipe(
      map(it => it.map(it => DeviceStatusDto.from(it)))
    );
  }

  public getInstructions(mac: string, page?: number, pageSize?: number): Observable<DeviceInstructionDto[]>{
    let param = new HttpParams();
    if(page) param = param.set('page', page);
    if(pageSize) param = param.set('pageSize', pageSize);
    return this.client.get<DeviceInstructionDto[]>(`${environment.production}/devices/${mac}`,{ params: param }).pipe(
      map(it => it.map(it => DeviceInstructionDto.from(it)))
    );
  }
}
