import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceStatusOverviewComponent } from './device-status-overview.component';

describe('DeviceStatusOverviewComponent', () => {
  let component: DeviceStatusOverviewComponent;
  let fixture: ComponentFixture<DeviceStatusOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceStatusOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceStatusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
