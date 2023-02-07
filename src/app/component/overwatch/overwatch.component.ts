import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkflowService } from 'src/app/service/workflow.service';

@Component({
  selector: 'app-overwatch',
  templateUrl: './overwatch.component.html',
  styleUrls: ['./overwatch.component.css']
})
export class OverwatchComponent implements OnInit {

  constructor(
    private readonly client: HttpClient,
    private readonly workflowService: WorkflowService,
  ) { }

  ngOnInit(): void {
  }   
  
  public get imgUrl():string{
    return this.workflowService.overwatchUrl;
  }
}
