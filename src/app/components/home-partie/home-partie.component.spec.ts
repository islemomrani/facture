import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartieComponent } from './home-partie.component';

describe('HomePartieComponent', () => {
  let component: HomePartieComponent;
  let fixture: ComponentFixture<HomePartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
