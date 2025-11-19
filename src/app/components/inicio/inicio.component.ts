import { Component,OnInit  } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone:true
})

export class InicioComponent implements OnInit {
  //variables
  empleadoBuscado:string='';
  contraEB:string='';
  empleados: any[] = [];
  usuarioEncontrado:any=null;
  msjError:string='';
  msjExito:string=''
  //servicio
  constructor(private empleadosService: EmpleadosService,
    private router:Router) {}

  //metodos
  buscarUE() {
  // limpiar mensajes previos
  this.usuarioEncontrado = null;
  this.msjError = '';
  this.msjExito = '';

  // Llamada al backend
  this.empleadosService.buscarEmpleado(this.empleadoBuscado, this.contraEB)
    .subscribe({
      next: (usuario) => {
        console.log('RESPUESTA backend (usuario):', usuario);

        // Guardar si tu servicio tiene setUsuario
        if (typeof this.empleadosService.setUsuario === 'function') {
          this.empleadosService.setUsuario(usuario);
        } else {
          console.warn('EmpleadosService no tiene setUsuario().');
        }

        // comprobaciones extra
        console.log('this.router.config (rutas registradas):', this.router.config);
        console.log('Router URL actual:', this.router.url);

        // Normalizar tipo (evita problemas de espacios/mayúsculas)
        const tipo = (usuario?.tipoempleado ?? '').toString().trim().toLowerCase();
        console.log('tipo normalizado:', tipo);

        if (tipo === 'dentista') {
          console.log('Navegando a menu-dentista');
          this.router.navigate(['/menu-dentista']);
        }else{
          this.msjError=`Tipo de usuario no reconocido : ${usuario?.tipoempleado}`;
        }
        
        
        /*else if (tipo === 'ayudante') {
          console.log('Navegando a menu-ayudante');
          this.router.navigate(['/menu-ayudante']);
        } else if (tipo === 'recepcion') {
          console.log('Navegando a menu-recepcion');
          this.router.navigate(['/menu-recepcion']);
        } else {
          console.log('NO FALLO :( — tipo no reconocido:', usuario?.tipoempleado);
          this.msjError = `Tipo de usuario no reconocido: ${usuario?.tipoempleado}`;
        }*/
       console.log("pipipip")
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.msjError = err.status === 404 ? err.error?.message || 'Usuario no encontrado' : 'Error del servidor';
      }
    });

  }

  ngOnInit(): void {
    this.empleadosService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
        console.log("Datos desde el backend:", data);
      },
      (error) => {
        console.error("Error consultando empleados:", error);
      }
    );
  }
}
