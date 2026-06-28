import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretestquestionsComponent } from './pretestquestions.component';

describe('PretestquestionsComponent', () => {
  let component: PretestquestionsComponent;
  let fixture: ComponentFixture<PretestquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PretestquestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PretestquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
