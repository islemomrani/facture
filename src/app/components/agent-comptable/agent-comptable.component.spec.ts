import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentComptableComponent } from './agent-comptable.component';

describe('AgentComptableComponent', () => {
  let component: AgentComptableComponent;
  let fixture: ComponentFixture<AgentComptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentComptableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
