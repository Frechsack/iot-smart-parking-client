import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowService } from 'src/app/service/workflow.service';
import { Subscriber, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.css']
})
export class OverwatchComponent implements OnInit, OnDestroy {

  private cacheBreaker: string = '';
  private cacheBreakerSubscription?: Subscription;


  constructor(
    private readonly client: HttpClient,
    private readonly workflowService: WorkflowService,
  ) { }
  
  ngOnDestroy(): void {
    this.cacheBreakerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.cacheBreakerSubscription = timer(0, environment.overwatchIntervalMs).subscribe(() => this.cacheBreaker = `${Date.now()}`);
  } 
  
  public get imgUrl():string{
    return this.workflowService.overwatchUrl + `?dummy=${this.cacheBreaker}`;
  }
}
