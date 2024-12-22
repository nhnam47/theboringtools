import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMeComponent } from './daily-me.component';

describe('DailyMeComponent', () => {
  let component: DailyMeComponent;
  let fixture: ComponentFixture<DailyMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
