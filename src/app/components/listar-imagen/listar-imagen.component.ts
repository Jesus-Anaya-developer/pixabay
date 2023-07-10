import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {

  termino = '';
  suscription: Subscription;
  listImagenes: any[] = [];
  loading = false;

  constructor(private _imagenService: ImagenService) {

    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data,
        this.loading = true,
        this.obtenerImagenes()
    });
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino).subscribe(data => {

      setTimeout(() => {
        this.loading = false;
      }, 3000);

      if (data.hits.length == 0) {
        this._imagenService.setError('Opss.. no encontramos ningun resultado');
        return
      }

      this.listImagenes = data.hits;

    }, error => {
      this._imagenService.setError('Opss.. ocurrio un error');
      this.loading = false;
    }
    )
  }

}
