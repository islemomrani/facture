import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFactureComponent } from './request-facture.component';

describe('RequestFactureComponent', () => {
  let component: RequestFactureComponent;
  let fixture: ComponentFixture<RequestFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
