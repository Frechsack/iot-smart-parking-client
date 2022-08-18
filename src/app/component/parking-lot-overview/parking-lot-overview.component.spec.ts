import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotOverviewComponent } from './parking-lot-overview.component';

describe('ParkingLotOverviewComponent', () => {
  let component: ParkingLotOverviewComponent;
  let fixture: ComponentFixture<ParkingLotOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
