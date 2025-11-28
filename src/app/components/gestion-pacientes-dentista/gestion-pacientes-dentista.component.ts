import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PacientesService } from '../../services/pacientes.service';
import { DerivacionesExtPacienteComponent } from "../derivaciones-ext-paciente/derivaciones-ext-paciente.component";
import { HistorialPacientesComponent } from "../historial-pacientes/historial-pacientes.component";
import { TratamientoPacientesComponent } from "../tratamiento-pacientes/tratamiento-pacientes.component";
import { AtencionCitaComponent } from '../atencion-cita/atencion-cita.component';

declare var bootstrap: any;

@Component({
  standalone:true,
  selector: 'app-gestion-pacientes-dentista',
  imports: [CommonModule, ReactiveFormsModule,DerivacionesExtPacienteComponent, HistorialPacientesComponent, 
    TratamientoPacientesComponent,AtencionCitaComponent],
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

  vistaActiva: 'lista' | 'detalle' = 'lista'; 
  pacienteSeleccionado: any = null;
  pacienteSeleccionadoId: number | null = null;
  searchForm:FormGroup;
  //para controldar la cita
  citaParaAtender: any = null;

  constructor(private fb: FormBuilder,private usuarioService:PacientesService) {
    //campos del formulario
    this.searchForm = this.fb.group({
      nombres: [''],
      apellidoPat: [''],
      apellidoMat: [''],

    });

    ////FORMULARIO CON VALIDACIONES
    this.searchForm = this.fb.group({
      nombres: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoPat: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoMat: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    });


  }


  ngOnInit(): void {
    // Carga todos los pacientes al iniciar, pasando valores vacíos
    this.buscarPacientes('', '', '');
  }

  onSearch() {
    //validacion
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    //objeto que obtiene los valores
    let { nombres, 
      apellidoPat, 
      apellidoMat,
    } = this.searchForm.value;

    // Convertir a minúsculas
    nombres = nombres?.toLowerCase() || '';
    apellidoPat = apellidoPat?.toLowerCase() || '';
    apellidoMat = apellidoMat?.toLowerCase() || '';

    console.log('Buscado por:', nombres, apellidoPat, apellidoMat);
    //se manda a llamar al servicio
    this.buscarPacientes(nombres, apellidoPat, apellidoMat);
  }


  buscarPacientes(nombres: string, apellidoPat: string, apellidoMat: string) {
        // En lugar de llamar a getReporteCompleto(), usamos la ruta /buscar que ya modificamos
        // para que devuelva la vista de reporte.
        this.usuarioService.buscarPacientes(nombres, apellidoPat, apellidoMat).subscribe({
            next: (data) => {
                //los resultados son filas de la vista_reporte_cita_completa
                this.pacientes = data; 

                /*if (data.length > 0) {
                  this.pacienteSeleccionadoId = data[0].id_paciente;
                } else {
                  this.pacienteSeleccionadoId = null;
                }*/
               this.pacienteSeleccionadoId = null;

            },
            error: (err) => {
                console.error('Error buscando reportes:', err);
                this.pacientes = []; // Vacía la tabla si hay error o no hay resultados
                alert('No se encontraron pacientes con esos datos.');
            }
        });
    }

  volverAlMenu() {
    this.volverMenu.emit();
  }

  verDetalle(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.vistaActiva = 'detalle';
  }

  volverALista() {
    this.vistaActiva = 'lista';
    this.pacienteSeleccionado = null;
    this.buscarPacientes('', '', ''); // Recargar la lista
  }

  seleccionarPaciente(paciente: any) {
    console.log("Paciente seleccionado:", paciente.paciente_nombre_completo);
    this.pacienteSeleccionadoId = paciente.id_paciente;
    this.pacienteSeleccionado = paciente; // Si usas esto para mostrar el nombre en algún lado
  }


  cargarTodosLosPacientes() {
    // Llamamos al servicio con cadenas vacías para traer todo
    this.buscarPacientes('', '', '');
  }

  resetBusqueda() {
    // 1. Limpiar los valores del formulario
    this.searchForm.reset({
      nombres: '',
      apellidoPat: '',
      apellidoMat: ''
    });

    // 2. Limpiar la selección de la tabla (esto resetea las pestañas de abajo)
    this.pacienteSeleccionadoId = null; 
    this.pacienteSeleccionado = null;

    // 3. Recargar la tabla principal con todos los datos
    this.cargarTodosLosPacientes();
  }

  //triggers:
  /*
  tr_verificar_stock_detalle : Evita que el dentista registre 10 unidades de anestesia si solo quedan 2. Esto te ahorra validaciones complejas en Angular.
  tr_reducir_stock:Automatiza el inventario. En cuanto Angular guarde el consumo, el stock baja solo.
  tr_historial_solo_atendida:Cuando seleccionas al paciente en tu buscador, usa esta función para llenar los campos de "Alergias" y "Enfermedades" previas en el formulario.
  
  fn_obtener_historial_completo_paciente: Sirve para ver datos, pero no para guardar. Úsala cuando cargues al paciente.*/

  //leer el modal
  abrirModalAtencion(citaReporte: any) {
    // Mapeamos los datos de la vista al formato que espera el modal
    this.citaParaAtender = {
      id_cita: citaReporte.id_cita,
      id_paciente: citaReporte.id_paciente,
      paciente_nombre_completo: citaReporte.paciente_nombre_completo, // O el nombre que tengas
      fecha_hora: citaReporte.fecha_hora,
      motivo_principal_cita: citaReporte.motivo_principal_cita,
      estado_cita: citaReporte.estado_cita
    };

    // Abrir modal de Bootstrap
    const modalElement = document.getElementById('modalAtencion');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  //metodo para guardar los datos de atención
  recargarDatos() {
    // Recargamos la búsqueda actual para ver el cambio de estado a "Atendida"
    const { nombres, apellidoPat, apellidoMat } = this.searchForm.value;
    this.buscarPacientes(nombres, apellidoPat, apellidoMat);
  }
  
}



  


