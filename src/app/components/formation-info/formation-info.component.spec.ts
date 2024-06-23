import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationInfoComponent } from './formation-info.component';

describe('FormationInfoComponent', () => {
  let component: FormationInfoComponent;
  let fixture: ComponentFixture<FormationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
