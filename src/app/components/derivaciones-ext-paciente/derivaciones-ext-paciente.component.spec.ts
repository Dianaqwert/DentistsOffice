import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivacionesExtPacienteComponent } from './derivaciones-ext-paciente.component';

describe('DerivacionesExtPacienteComponent', () => {
  let component: DerivacionesExtPacienteComponent;
  let fixture: ComponentFixture<DerivacionesExtPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DerivacionesExtPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerivacionesExtPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
