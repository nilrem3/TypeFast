import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandoffpromptComponent } from './handoffprompt.component';

describe('HandoffpromptComponent', () => {
  let component: HandoffpromptComponent;
  let fixture: ComponentFixture<HandoffpromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandoffpromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandoffpromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
