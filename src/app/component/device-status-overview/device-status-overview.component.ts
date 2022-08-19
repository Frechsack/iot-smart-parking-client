import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom, ReplaySubject, timer } from 'rxjs';
import { DeviceInstructionDto } from 'src/app/dto/device-instruction-dto';
import { DeviceStatusDto } from 'src/app/dto/device-status-dto';
import { PaginationDto } from 'src/app/dto/pagination-dto';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device-status-overview',
  templateUrl: './device-status-overview.component.html',
  styleUrls: ['./device-status-overview.component.css']
})
export class DeviceStatusOverviewComponent implements OnInit {

  public readonly displayedColumns = [ 'date', 'status' ];
  public readonly pageSizeOptions = [ 20 ];

  private paginationPage = 0;
  private paginationPageSize = this.pageSizeOptions[0];

  @Input()
  public mac!: string;

  public status: PaginationDto<DeviceStatusDto> = PaginationDto.EMPTY;

  public readonly dataSource = new ReplaySubject<DeviceStatusDto[]>();

  constructor(
    private readonly deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.updateStatus();
    timer(0,5000).subscribe(async () => this.updateStatus());
  }

  public async paginationChange(event: PageEvent){
    this.paginationPage = event.pageIndex;
    this.paginationPageSize = event.pageSize;
    this.updateStatus();
  }

  public async updateStatus(){
    try {
      const status = await firstValueFrom(this.deviceService.getStatus(this.mac,this.paginationPage, this.paginationPageSize));
      this.status = status;
      this.dataSource.next(status.data);
    }
    catch (error) {
      // Nicht eingeloggt
    }
  }

}
