import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DeviceDto } from 'src/app/dto/device-dto';
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
  public mac?: string;

  @Input()
  public device?: DeviceDto;

  constructor(
    private readonly deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    if(this.device === undefined)
      this.updateDevice();
    if(this.mac === undefined)
      this.mac = this.device?.mac;
  }

  public async updateDevice(){
    const mac = this.mac === undefined ? this.device?.mac : this.mac;
    if(mac === undefined)
      throw new Error('Mac is undefined');
    try {
      this.device = await firstValueFrom(this.deviceService.get(mac));
    } catch(error) {

    }
  }



}
