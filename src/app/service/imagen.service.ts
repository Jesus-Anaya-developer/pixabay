import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBUsqueda$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string) {
    this.error$.next(mensaje);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string) {
    this.terminoBUsqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string> {
    return this.terminoBUsqueda$.asObservable();
  }

  getImagenes(termino: string, imagenesPorPagina: number, paginaActual: number): Observable<any> {

    const KEY = '37115025-765928e6b0eac7c350910363b';
    const URL = 'https://pixabay.com/api/?key=' + KEY + '&q=' + termino + '&per_page=' + imagenesPorPagina + '&page=' + paginaActual;
    return this.http.get(URL);
  }
}
