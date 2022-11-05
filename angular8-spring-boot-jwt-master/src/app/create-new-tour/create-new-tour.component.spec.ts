import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTourComponent } from './create-new-tour.component';

describe('CreateNewTourComponent', () => {
  let component: CreateNewTourComponent;
  let fixture: ComponentFixture<CreateNewTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
