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
  paginaActual: number = 1;
  calcularTotalPaginas: number = 0;
  imagenesPorPagina: number = 20;

  constructor(private _imagenService: ImagenService) {

    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data,
        this.paginaActual = 1,
        this.loading = true,
        this.obtenerImagenes()
    });
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data => {

      setTimeout(() => {
        this.loading = false;
      }, 2000);

      if (data.hits.length == 0) {
        this._imagenService.setError('Opss.. no encontramos ningun resultado');
        return
      }

      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);

      this.listImagenes = data.hits;

    }, error => {
      this._imagenService.setError('Opss.. ocurrio un error');
      this.loading = false;
    }
    )
  }

  paginaAnterior() {
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaSiguiente() {
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass() {

    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }

  paginaSiguienteClass() {
    if (this.paginaActual === this.calcularTotalPaginas) {
      return false;
    } else {
      return true;
    }
  }

}
