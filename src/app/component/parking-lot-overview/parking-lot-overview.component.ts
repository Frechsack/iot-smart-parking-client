import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { DeviceDto } from 'src/app/dto/device-dto';
import { ParkingLotDto } from 'src/app/dto/parking-lot-dto';
import { DeviceService } from 'src/app/service/device.service';
import { ParkingLotService } from 'src/app/service/parking-lot.service';

@Component({
  selector: 'app-parking-lot-overview',
  templateUrl: './parking-lot-overview.component.html',
  styleUrls: ['./parking-lot-overview.component.css']
})
export class ParkingLotOverviewComponent implements OnInit {

  @Input()
  public parkingLot!: ParkingLotDto;

  public devicesMacs: string[] = [];

  constructor(
    private readonly deviceService: DeviceService,
    private readonly parkingLotService: ParkingLotService
  ) { }

  ngOnInit(): void {
    this.updateDevices();
    timer(0,30000).subscribe(async () => this.updateDevices());
  }

  private async updateDevices(){
    try {
      const devicesMacs = await firstValueFrom(this.parkingLotService.getDevices(this.parkingLot.nr,0,10000));
      if(this.devicesMacs.length !== devicesMacs.length){
        this.devicesMacs = devicesMacs;
        return;
      }
      for(let i = 0; i < devicesMacs.length; i++)
        if(this.devicesMacs[i] !== devicesMacs[i])
          this.devicesMacs[i] = devicesMacs[i];
    }
    catch (error) {
      // Nicht eingeloggt v. kein Admin
    }
  }

}
