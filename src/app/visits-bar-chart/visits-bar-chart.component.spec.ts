import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsBarChartComponent } from './visits-bar-chart.component';

describe('VisitsBarChartComponent', () => {
  let component: VisitsBarChartComponent;
  let fixture: ComponentFixture<VisitsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitsBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
