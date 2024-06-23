import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationTableComponent } from './formation-table.component';

describe('FormationTableComponent', () => {
  let component: FormationTableComponent;
  let fixture: ComponentFixture<FormationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
