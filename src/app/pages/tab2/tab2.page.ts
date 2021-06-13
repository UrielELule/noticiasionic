import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild( IonSegment, { static: true } ) segment: IonSegment;

  categorias: string[] = ['business', 'entertainment','general','health', 'science', 'sports', 'technology'];  
  noticias: Article[] = [];

  constructor(private apiSvc: NoticiasService) {}

  ngOnInit() {
    //segment scroll
    this.segment.value = this.categorias[0]; ///la categoria actual
    this.cargarNoticias(this.segment.value );
  
  }


  cambioCategoria( event ) {
    this.noticias = []; //reseteamos cuanod cambiemos de categoria
    this.cargarNoticias( event.detail.value );
  }

  cargarNoticias( categoria: string, event? ) {

    this.apiSvc.getTopHeadLinesCategoria(categoria)
    .subscribe(data => {
      console.log(data);
      //insertamos al arreglo
      this.noticias.push(...data.articles); //asi concatenamos noticias de las categorias

      //validacion para cancelar el infinite scroll 
      if(event) {
        event.target.complete();
      }

    });

  }


  loadData(event) {
    this.cargarNoticias( this.segment.value, event );
  }


}
