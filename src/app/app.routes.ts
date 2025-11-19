import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuDentistaComponent } from './components/menu-dentista/menu-dentista.component';
import { GestionPacientesDENTISTAComponent } from './components/gestion-pacientes-dentista/gestion-pacientes-dentista.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'menu-dentista', component: MenuDentistaComponent },
  {path: 'gestion-pacientes-dentista',component:GestionPacientesDENTISTAComponent}
];