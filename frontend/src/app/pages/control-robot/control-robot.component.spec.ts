import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRobotComponent } from './control-robot.component';

describe('ControlRobotComponent', () => {
  let component: ControlRobotComponent;
  let fixture: ComponentFixture<ControlRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlRobotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
