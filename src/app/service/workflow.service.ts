import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(
    private readonly client: HttpClient,
  ) { }

  public initOverwatch(): Observable<void> {
    return this.client.post<void>(`${environment.backendUrl}/workflow/parking-guide`,{}).pipe(
      map(()=> {})
    );
  }

  public get overwatchUrl():string{
    return `${environment.backendUrl}/workflow/parking-guide`;
  }
}
