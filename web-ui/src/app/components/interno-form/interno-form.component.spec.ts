import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternoFormComponent } from './interno-form.component';

describe('InternoFormComponent', () => {
  let component: InternoFormComponent;
  let fixture: ComponentFixture<InternoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
