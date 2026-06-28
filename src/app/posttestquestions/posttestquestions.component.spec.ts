import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosttestquestionsComponent } from './posttestquestions.component';

describe('PosttestquestionsComponent', () => {
  let component: PosttestquestionsComponent;
  let fixture: ComponentFixture<PosttestquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosttestquestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosttestquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
