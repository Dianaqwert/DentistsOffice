import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GestionPacientesDENTISTAComponent } from '../gestion-pacientes-dentista/gestion-pacientes-dentista.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-dentista',
  imports: [CommonModule,GestionPacientesDENTISTAComponent,FormsModule],
  templateUrl: './menu-dentista.component.html',
  styleUrl: './menu-dentista.component.css'
})
export class MenuDentistaComponent {
  usuario: any;
  pacientes: any[] = []; // Propiedad para guardar la lista de pacientes
  mostrarListaPacientes: boolean = false; // Bandera para alternar la vista

  constructor(private usuarioService: EmpleadosService,private router:Router) {
    this.usuario = this.usuarioService.getUsuario();
  }

  //pacientes---------------------------------------------------------------------------------

  cargarPacientes() {
    this.usuarioService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.mostrarListaPacientes = true; 
        //this.router.navigate(['/gestion-pacientes-dentista']);
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
        alert('No se pudo cargar la lista de pacientes.');
      }
    });
  }

  volverAMenu() {
    this.mostrarListaPacientes = false;
    this.pacientes = []; // Opcional: limpiar la lista al volver
  }



}
