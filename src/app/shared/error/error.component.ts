import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy {

  textoError: string;
  mostrarError: boolean;
  suscripcion: Subscription;

  constructor(private _imagenService: ImagenService) {

    this.mostrarError = false;
    this.textoError = '';

    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.textoError = data;
    });
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
    }, 3000);
  }

}
