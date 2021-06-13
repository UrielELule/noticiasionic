import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinePage: number = 0;
  categoriaActual : string = '';
  categoriaPage: number = 0;

  constructor(private http: HttpClient) { }

  //funcion que siempre retorno el url + el apikey
  private ejecutarQuery<T>( query: string ){  //agregamos un generico
    query = apiUrl + query;
    return this.http.get<T>( query, {  headers: headers } ); //
  }

  getTopHeadLines(){

    this.headlinePage ++; 

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinePage}`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=773f7e3bbb924749932d2a3289725d85`);
  }

  getTopHeadLinesCategoria( categoria: string ) {

    //verificamos si es la misma categoria  LOGICA INFINETE SCROLL
    if(this.categoriaActual === categoria) {
      this.categoriaPage++;  //cargamos la siguiente pag del infiniscroll
    } else { //si no esta cargando una nueva categoria
       this.categoriaPage = 1;
       this.categoriaActual = categoria; 
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);
  }

}
