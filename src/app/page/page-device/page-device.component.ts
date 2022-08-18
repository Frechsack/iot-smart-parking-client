import { Component, OnInit } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { DeviceDto } from 'src/app/dto/device-dto';
import { DeviceService } from 'src/app/service/device.service';

@Component({
  selector: 'app-page-device',
  templateUrl: './page-device.component.html',
  styleUrls: ['./page-device.component.css']
})
export class PageDeviceComponent implements OnInit {

  public devices: DeviceDto[] = [];

  constructor(
    private readonly deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.updateDevices();
    timer(5000).subscribe(async () => this.updateDevices());
  }

  private async updateDevices(){
    try {
      this.devices = (await firstValueFrom(this.deviceService.getAll(0,200000))).data;
    }
    catch (error) {
    }
  }

}
