import { Component, Input, OnInit } from '@angular/core';
import { DeviceInstructionDto } from 'src/app/dto/device-instruction-dto';
import { DeviceStatusDto } from 'src/app/dto/device-status-dto';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrls: ['./device-overview.component.css']
})
export class DeviceOverviewComponent implements OnInit {

  @Input()
  public mac!: string;

  constructor(
    private readonly deviceService: DeviceService
  ) { }

  ngOnInit(): void {
  }

}
