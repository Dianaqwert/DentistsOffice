import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private API_URL="http://localhost:3000/api/empleados";
  API_PACIENTES_URL="http://localhost:3000/api/pacientes"

  constructor(private http:HttpClient) { }

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
