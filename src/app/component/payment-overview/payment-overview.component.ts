import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { firstValueFrom, ReplaySubject, timer } from 'rxjs';
import { PaginationDto } from 'src/app/dto/pagination-dto';
import { PaymentDto } from 'src/app/dto/payment-dto';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.css']
})
export class PaymentOverviewComponent implements OnInit {

  public readonly displayedColumns = [ 'from', 'to', 'price' ];
  public readonly pageSizeOptions = [ 5, 20, 50 ];

  private paginationPage = 0;
  private paginationPageSize = this.pageSizeOptions[0];

  @Input()
  public plate!: string;

  @Input()
  public displayPlate: boolean = false;

  public payments: PaginationDto<PaymentDto> = PaginationDto.EMPTY;

  public readonly dataSource = new ReplaySubject<PaymentDto[]>();

  constructor(
    private readonly accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.updatePayments();
    timer(0,10000).subscribe(async () => this.updatePayments());
  }

  public async paginationChange(event: PageEvent){
    this.paginationPage = event.pageIndex;
    this.paginationPageSize = event.pageSize;
    this.updatePayments();
  }

  public async updatePayments(){
    try {
      const payments = await firstValueFrom(this.accountService.getPayments('this',this.plate,this.paginationPage, this.paginationPageSize));
      this.payments = payments;
      this.dataSource.next(payments.data);
    }
    catch (error) {
      // Nicht eingeloggt
    }
  }

}
