import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTrackingComponent } from './daily-tracking.component';

describe('DailyTrackingComponent', () => {
  let component: DailyTrackingComponent;
  let fixture: ComponentFixture<DailyTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
