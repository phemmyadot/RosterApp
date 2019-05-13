import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterformComponent } from './rosterform.component';

describe('RosterformComponent', () => {
  let component: RosterformComponent;
  let fixture: ComponentFixture<RosterformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
