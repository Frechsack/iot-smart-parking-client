import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom, ReplaySubject, timer } from 'rxjs';
import { DeviceInstructionDto } from 'src/app/dto/device-instruction-dto';
import { PaginationDto } from 'src/app/dto/pagination-dto';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device-instruction-overview',
  templateUrl: './device-instruction-overview.component.html',
  styleUrls: ['./device-instruction-overview.component.css']
})
export class DeviceInstructionOverviewComponent implements OnInit {

  public readonly displayedColumns = [ 'date', 'instruction' ];
  public readonly pageSizeOptions = [ 20 ];

  private paginationPage = 0;
  private paginationPageSize = this.pageSizeOptions[0];

  @Input()
  public mac!: string;

  public instructions: PaginationDto<DeviceInstructionDto> = PaginationDto.EMPTY;

  public readonly dataSource = new ReplaySubject<DeviceInstructionDto[]>();

  constructor(
    private readonly deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.updateInstructions();
    timer(5000).subscribe(async () => this.updateInstructions());
  }

  public async paginationChange(event: PageEvent){
    this.paginationPage = event.pageIndex;
    this.paginationPageSize = event.pageSize;
    this.updateInstructions();
  }

  public async updateInstructions(){
    try {
      const instructions = await firstValueFrom(this.deviceService.getInstructions(this.mac,this.paginationPage, this.paginationPageSize));
      this.instructions = instructions;
      this.dataSource.next(instructions.data);
      console.log(this.instructions.data);
    }
    catch (error) {
      // Nicht eingeloggt
    }
  }
}
