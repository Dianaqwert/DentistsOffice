import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Router} from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-administracion-dentista',
  imports: [CommonModule,FormsModule,AdministracionDentistaComponent],
  templateUrl: './administracion-dentista.component.html',
  styleUrl: './administracion-dentista.component.css'
})

export class AdministracionDentistaComponent implements OnInit{

  @Input() empleados: any[] = []; // Recibe la lista del padre
  volver = new EventEmitter<void>();

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadosService.getListarEmpleados().subscribe(data => {
        this.empleados = data;
    });
  }

 
  
}
