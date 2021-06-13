import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private apinews: NoticiasService) {
    
  }
  
  ngOnInit(): void {
    this.cargarNoticia();
  }

  loadData(event){
    this.cargarNoticia( event );
  }

  //se tiene que cancelar el infini scroll cuando ya esten todas las noticias
  cargarNoticia(event?){

    this.apinews.getTopHeadLines().subscribe(resp => {
      console.log('noticias', resp);
      ///terminamos el infinitescroll
      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push( ...resp.articles);

      //comprobamos si exite el complete de las noticias
      if( event ) {
        event.target.complete();
      }

    });
 
  }

}
