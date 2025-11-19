import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPacientesDENTISTAComponent } from './gestion-pacientes-dentista.component';

describe('GestionPacientesDENTISTAComponent', () => {
  let component: GestionPacientesDENTISTAComponent;
  let fixture: ComponentFixture<GestionPacientesDENTISTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPacientesDENTISTAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPacientesDENTISTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
