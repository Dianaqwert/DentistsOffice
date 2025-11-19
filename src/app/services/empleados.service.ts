import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  usuarioLogeado:any=null;
  private API_URL="http://localhost:3000/api/empleados";
  API_PACIENTES_URL="http://localhost:3000/api/pacientes"
  constructor(private http:HttpClient) { }

  //observable
  getEmpleados():Observable<any>{
    return this.http.get(this.API_URL)
  }

  setUsuario(usuario:any){
    this.usuarioLogeado=usuario;
  }
  getUsuario(){
    return this.usuarioLogeado;
  }

  //funcion para buscar empleados por campo
  buscarEmpleado(nombreUser:string,contrasena:string):Observable<any>{
    const body={
      nombre:nombreUser,
      contrasena:contrasena
    };

    //solicitud post
    return this.http.post<any>(`${this.API_URL}/buscar`,body);
  }

  //paciente
  getPacientes():Observable<any>{
    return this.http.get(this.API_PACIENTES_URL)
  }

  buscarPacientes(nombres: string, apellidoPat: string, apellidoMat: string) {
    let params = new HttpParams();
    if (nombres) params = params.set('nombre', nombres);
    if (apellidoPat) params = params.set('apellidoPat', apellidoPat);
    if (apellidoMat) params = params.set('apellidoMat', apellidoMat);

    return this.http.get<any[]>('http://localhost:3000/api/pacientes/buscar', { params });

  }


  
}
