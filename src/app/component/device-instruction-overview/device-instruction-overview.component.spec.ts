import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInstructionOverviewComponent } from './device-instruction-overview.component';

describe('DeviceInstructionOverviewComponent', () => {
  let component: DeviceInstructionOverviewComponent;
  let fixture: ComponentFixture<DeviceInstructionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceInstructionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInstructionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
