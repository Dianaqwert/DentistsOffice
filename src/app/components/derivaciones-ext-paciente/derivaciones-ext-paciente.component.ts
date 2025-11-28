import { CommonModule, DatePipe} from '@angular/common';
import { Component, Input, OnChanges, OnInit,SimpleChanges,input } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  standalone:true,
  selector: 'app-derivaciones-ext-paciente',
  imports: [CommonModule,DatePipe],
  templateUrl: './derivaciones-ext-paciente.component.html',
  styleUrl: './derivaciones-ext-paciente.component.css'
})


export class DerivacionesExtPacienteComponent implements OnInit, OnChanges {
  // Recibe el ID del paciente (puede ser null al inicio)
  @Input() idPaciente: number | null = null; 
  derivaciones: any[] = [];
  
  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    // 1. Carga inicial (mostrar todos al inicio si idPaciente es null)
    this.cargarDerivaciones(this.idPaciente);

  }

  // 2. Detecta cambios en el ID del paciente (ej: cuando se busca)
  ngOnChanges(changes: SimpleChanges): void {
    // Simplemente verifica si la propiedad cambió, sin importar si es la primera vez
    if (changes['idPaciente']) {
      this.cargarDerivaciones(this.idPaciente)
    }
  }

  cargarDerivaciones(id: number | null) {
    this.pacientesService.getDerivaciones(id).subscribe({
      next: (data) => {
        this.derivaciones = data;
        console.log("Derivaciones cargadas:", data.length); // Para depurar
      },
      error: (err) => {
        console.error('Error cargando derivaciones:', err);
        this.derivaciones = [];
      }
    });
  }


}