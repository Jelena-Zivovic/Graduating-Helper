import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeDayComponent } from './organize-day.component';

describe('OrganizeDayComponent', () => {
  let component: OrganizeDayComponent;
  let fixture: ComponentFixture<OrganizeDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizeDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
