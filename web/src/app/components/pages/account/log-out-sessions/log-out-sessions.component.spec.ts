import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutSessionsComponent } from './log-out-sessions.component';

describe('LogOutSessionsComponent', () => {
  let component: LogOutSessionsComponent;
  let fixture: ComponentFixture<LogOutSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
