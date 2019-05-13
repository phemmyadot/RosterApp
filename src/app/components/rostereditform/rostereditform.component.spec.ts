import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RostereditformComponent } from './rostereditform.component';

describe('RostereditformComponent', () => {
  let component: RostereditformComponent;
  let fixture: ComponentFixture<RostereditformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RostereditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RostereditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
