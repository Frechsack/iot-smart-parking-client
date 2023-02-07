import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowService } from 'src/app/service/workflow.service';
import { firstValueFrom, Subscriber, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.css']
})
export class OverwatchComponent implements OnInit, OnDestroy {

  private cacheBreaker: string = '';
  private cacheBreakerSubscription?: Subscription;
  private _imageUrl?: SafeUrl;

  constructor(
    private readonly client: HttpClient,
    private readonly workflowService: WorkflowService,
  ) { }
  
  ngOnDestroy(): void {
    this.cacheBreakerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.cacheBreakerSubscription = timer(0, environment.overwatchIntervalMs).subscribe(async () => {
      this.cacheBreaker = `${Date.now()}`
      this._imageUrl = await firstValueFrom(this.workflowService.overwatchSecureUrl(this.workflowService.overwatchUrl+ `?dummy=${this.cacheBreaker}`));
    });
  } 

  public get imageUrl(): SafeUrl | undefined {
    return this._imageUrl;
  }
}
