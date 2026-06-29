import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasaveComponent } from './datasave.component';

describe('DatasaveComponent', () => {
  let component: DatasaveComponent;
  let fixture: ComponentFixture<DatasaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
