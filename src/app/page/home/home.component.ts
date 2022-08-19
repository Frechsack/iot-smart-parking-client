import { Component, OnInit } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';
import { ParkingLotDto } from 'src/app/dto/parking-lot-dto';
import { AccountService } from 'src/app/service/account.service';
import { ParkingLotService } from 'src/app/service/parking-lot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public parkingLots: ParkingLotDto[] = [];
  public plates: string[] = [];

  constructor(
    private readonly parkingLotService: ParkingLotService,
    private readonly accountService: AccountService
  ) {

  }

  ngOnInit(): void {
    const funUpdate = () => {
      this.updateParkingLots();
      this.updatePlates();
    };
    timer(0,10000).subscribe(async () => funUpdate());
  }

  private async updatePlates(){
    try {
      const plates = (await (firstValueFrom(this.accountService.getAccount('this')))).licensePlates;
      if(this.plates.length !== plates.length)
      {
        this.plates = plates;
        return;
      }

      for(let i = 0; i < plates.length; i++)
        if(this.plates[i] !== plates[i])
          this.plates[i] = plates[i];
    }
    catch (error){

    }
  }

  private async updateParkingLots(){
    this.parkingLotService.getParkingLots().subscribe(async its => {
      const parkingLots = its.data;
      if(parkingLots.length !== this.parkingLots.length){
        this.parkingLots = parkingLots;
        return;
      }

      for(let i = 0; i < parkingLots.length; i++)
        if((this.parkingLots[i].nr !== parkingLots[i].nr) || (this.parkingLots[i].isAvailable !== parkingLots[i].isAvailable))
            this.parkingLots[i] = parkingLots[i];
    });
  }

}
