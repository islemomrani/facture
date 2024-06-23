import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeFormationComponent } from './edite-formation.component';

describe('EditeFormationComponent', () => {
  let component: EditeFormationComponent;
  let fixture: ComponentFixture<EditeFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
