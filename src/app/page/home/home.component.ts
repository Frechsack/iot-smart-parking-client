import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom, timer } from 'rxjs';
import { ParkingLotDto } from 'src/app/dto/parking-lot-dto';
import { AccountService } from 'src/app/service/account.service';
import { ParkingLotService } from 'src/app/service/parking-lot.service';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OverwatchComponent } from 'src/app/component/overwatch/overwatch.component';
import { AccountDto } from 'src/app/dto/account-dto';
import { WorkflowService } from 'src/app/service/workflow.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public parkingLots: ParkingLotDto[] = [];
  public plates: string[] = [];
  public readonly licensePlateInput = new FormControl("", Validators.required);
  public currentUser? : AccountDto;

  constructor(
    private readonly parkingLotService: ParkingLotService,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly client: HttpClient,
    private readonly http: HttpClient,
    private readonly dialogRef: MatDialog,
    private readonly workflowService:  WorkflowService,
  ) {

  }

  async ngOnInit(): Promise<void> {
    const funUpdate = () => {
      this.updateParkingLots();
      this.updatePlates();
    };
    timer(0,10000).subscribe(async () => funUpdate());
    try{
          this.currentUser = await firstValueFrom(this.accountService.getAccount('this'));
    }
    catch{

    }
  }


  public navigateTo(value: any) {
    this.router.navigate([value]);
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

  public async addPlate(){
    this.licensePlateInput.markAsTouched();
    if (this.licensePlateInput.invalid)
    {
      this.messageService.error("Kennzeichen ungültig")
      return;

    }
    try{
      let plate = this.licensePlateInput.value;
      await firstValueFrom(this.accountService.addPlate("this", plate))
      this.updatePlates();
      this.messageService.message("Kennzeichen hinzugefügt")
      }

    catch(error:any) {
      this.messageService.error(error.error.message, error.error.status)
    }

  }

  public async removePlate(plate:string){
    if(!confirm("Wirklich löschen?")){
      return;
    }
    try{
      await firstValueFrom(this.accountService.removePlate("this", plate))
      this.updatePlates();
      this.messageService.message("Kennzeichen gelöscht")
    }

    catch(error:any) {
      this.messageService.error(error.error.message, error.error.status)
    }
  }

  public get isAdmin():boolean{
    return this.currentUser != undefined && this.currentUser.isAdmin;
  }

  public async showCam(){  
    if (this.isAdmin)  
    {
      this.dialogRef.open(OverwatchComponent)
    }
    else {
      this.messageService.error("Keine Berechtigung")
    }      
  }

  public async initOverwatch(){
    if (this.isAdmin)  
    {
      try {
         await firstValueFrom(this.workflowService.initOverwatch());
         this.messageService.message("Overwatch erfolgreich gestartet")
      }
      catch{
        this.messageService.error("Overwatch start fehlgeschlagen")
      }
     
    }
    else {
      this.messageService.error("Keine Berechtigung")
    }
  }
}
