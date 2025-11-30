import { Component, Input, input } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router, RouterOutlet ,RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  standalone:true,
  selector: 'app-menu-dentista',
  imports: [CommonModule,RouterOutlet,RouterModule,FormsModule],
  templateUrl: './menu-dentista.component.html',
  styleUrl: './menu-dentista.component.css'
})
export class MenuDentistaComponent {
  usuario: any;
  pacientes: any[] = []; // Propiedad para guardar la lista de pacientes
  mostrarListaPacientes: boolean = false; // Bandera para alternar la vista
  @Input() empleados:any[]=[]; //para los empleados
  esSuperAdmin:boolean=false;
  mostrarListaEmpleados: boolean = false; 

  constructor(private usuarioService: EmpleadosService,
    public router:Router,private paciente:PacientesService) {

    this.usuario = this.usuarioService.getUsuario();
    //validacion - verificacion de un superusuario
    this.esSuperAdmin=this.usuario?.superadmin===true||this.usuario?.superadmin==='true';
  }

  get esPaginaPrincipal(): boolean {
    return this.router.url === '/menu-dentista';
  }

  cerrarSesion() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }




}
