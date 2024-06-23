import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureTableComponent } from './facture-table.component';

describe('FactureTableComponent', () => {
  let component: FactureTableComponent;
  let fixture: ComponentFixture<FactureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
