import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorformComponent } from './colorform.component';

describe('ColorformComponent', () => {
  let component: ColorformComponent;
  let fixture: ComponentFixture<ColorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
