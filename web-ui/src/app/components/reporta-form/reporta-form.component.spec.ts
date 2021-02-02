import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportaFormComponent } from './reporta-form.component';

describe('ReportaFormComponent', () => {
  let component: ReportaFormComponent;
  let fixture: ComponentFixture<ReportaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
