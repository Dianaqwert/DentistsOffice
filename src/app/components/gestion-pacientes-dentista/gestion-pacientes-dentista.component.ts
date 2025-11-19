import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-gestion-pacientes-dentista',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './gestion-pacientes-dentista.component.html',
  styleUrl: './gestion-pacientes-dentista.component.css'
})

export class GestionPacientesDENTISTAComponent {
  // Recibe la lista de pacientes del componente padre
  @Input() pacientes: any[] = [];

  // Recibe la información del usuario para el saludo
  @Input() usuario: any;

  // Emite un evento al padre cuando se hace clic en "Volver"
  @Output() volverMenu = new EventEmitter<void>();

  searchForm:FormGroup;

  constructor(private fb: FormBuilder,private usuarioService:PacientesService) {
    //campos del formulario
    this.searchForm = this.fb.group({
      nombres: [''],
      apellidoPat: [''],
      apellidoMat: ['']
    });

  }

  onSearch() {
    //objeto que obtiene los valores
    let { nombres, 
      apellidoPat, 
      apellidoMat } = this.searchForm.value;

    // Convertir a minúsculas
    nombres = nombres?.toLowerCase() || '';
    apellidoPat = apellidoPat?.toLowerCase() || '';
    apellidoMat = apellidoMat?.toLowerCase() || '';

    console.log('Buscado por:', nombres, apellidoPat, apellidoMat);
    //se manda a llamar al servicio
    this.buscarPacientes(nombres, apellidoPat, apellidoMat);
  }


  buscarPacientes(nombres: string, apellidoPat: string,apellidoMat:string) {
    //se manda a llamar al servicio
    this.usuarioService.buscarPacientes(nombres, apellidoPat,apellidoMat).subscribe({
      next: (data) => {
        this.pacientes = data; // actualiza la tabla
      },
      error: (err) => {
        console.error('Error buscando pacientes', err);
        alert('No se encontraron pacientes con esos datos.');
      }
    });
  }

  volverAlMenu() {
    this.volverMenu.emit();
  }

}
