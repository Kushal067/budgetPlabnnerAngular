import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTourDetailsComponent } from './view-tour-details.component';

describe('ViewTourDetailsComponent', () => {
  let component: ViewTourDetailsComponent;
  let fixture: ComponentFixture<ViewTourDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTourDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
