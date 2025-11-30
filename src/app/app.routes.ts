import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuDentistaComponent } from './components/menu-dentista/menu-dentista.component';
import { GestionPacientesDENTISTAComponent } from './components/gestion-pacientes-dentista/gestion-pacientes-dentista.component';
import { AdministracionDentistaComponent } from './components/administracion-dentista/administracion-dentista.component';

// app.routes.ts

export const routes: Routes = [
  { path: 'login', component: InicioComponent },
  
  { 
    path: 'menu-dentista', 
    component: MenuDentistaComponent,
    children: [
      // ESTA ES LA CLAVE: Redirigir ruta vacía a una hija
      { path: '', redirectTo: 'gestion-pacientes', pathMatch: 'full' }, 
      
      { path: 'gestion-pacientes', component: GestionPacientesDENTISTAComponent },
      { path: 'administracion-empleados', component: AdministracionDentistaComponent },
    ]
  },
  
  { path: '**', redirectTo: 'login' }
];