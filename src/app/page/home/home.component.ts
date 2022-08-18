import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { ParkingLotDto } from 'src/app/dto/parking-lot-dto';
import { ParkingLotService } from 'src/app/service/parking-lot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public parkingLots: ParkingLotDto[] = [];

  constructor(
    private readonly parkingLotService: ParkingLotService
  ) {

  }

  ngOnInit(): void {
    this.updateParkingLots();
    timer(10000).subscribe(async () => this.updateParkingLots());
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
