import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportaListComponent } from './reporta-list.component';

describe('ReportaListComponent', () => {
  let component: ReportaListComponent;
  let fixture: ComponentFixture<ReportaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
