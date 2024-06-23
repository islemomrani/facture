import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisClientComponent } from './devis-client.component';

describe('DevisClientComponent', () => {
  let component: DevisClientComponent;
  let fixture: ComponentFixture<DevisClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
