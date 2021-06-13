import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;
   


  constructor(private iab: InAppBrowser, private shapi: SocialSharing, public asCtr: ActionSheetController, private dataLocalService: DataLocalService) { }

  ngOnInit() {
    console.log('En Favoritos', this.enFavoritos);
  }


  abrirNoticia(){
    //console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarbutton;

    if(this.enFavoritos) {
      //borrar de favoritos

      guardarBorrarbutton = {
        text: 'Borrar Favorito',
        icon: 'trash-outline',
        cssClass: 'action-danger',
        handler: () => {
          this.dataLocalService.deleteNotice(this.noticia);
        }
      };

    } else {
      guardarBorrarbutton = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.saveNotice(this.noticia);
        }
      };
    }

     const actionSheet = await this.asCtr.create({
      
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'action-light',
        handler: () => {
          this.shapi.share( this.noticia.title, this.noticia.source.name, '', this.noticia.url );
        }
      }, 
      guardarBorrarbutton,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
         
        }
      }
    ]
    });
    await actionSheet.present();

  }

}
