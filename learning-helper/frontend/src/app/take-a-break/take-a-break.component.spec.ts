import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeABreakComponent } from './take-a-break.component';

describe('TakeABreakComponent', () => {
  let component: TakeABreakComponent;
  let fixture: ComponentFixture<TakeABreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeABreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeABreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
