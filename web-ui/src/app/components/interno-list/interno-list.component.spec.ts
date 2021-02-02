import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternoListComponent } from './interno-list.component';

describe('InternoListComponent', () => {
  let component: InternoListComponent;
  let fixture: ComponentFixture<InternoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
