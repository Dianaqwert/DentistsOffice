import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmpleadosService } from './services/empleados.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoBD_7mo';

  constructor(private empleados:EmpleadosService){}
  /*
  enviar(): void {
console.log(this.lado);
const urapi = `http://localhost: 3000/calculos/${this.lado} ;
this.calculos.getJSON(urapi) .subscribe((res: any) => {
console.log(res);
// Una sintaxis alternativa al punto es la siguiente
this.area = res['area'];
this.perimetro = res['perimetro' ];
});//cierra parentesis de subscribe
}*/


}
