import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDevisComponent } from './request-devis.component';

describe('RequestDevisComponent', () => {
  let component: RequestDevisComponent;
  let fixture: ComponentFixture<RequestDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
