import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, private toastApi: ToastController) { 
    this.loadFavoriteNotice();
  }

  async presentToast(message: string) {
    const toast = await this.toastApi.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  saveNotice(notice: Article){

    //validamos que nos e repita la noticia
    const existe = this.noticias.find( noti => noti.title === notice.title );

    if (!existe) {
    this.storage.create();
    //mandamos al principio del arreglo
    this.noticias.unshift(notice);
    //guardamos en el storage
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Agregado a favoritos');//toast
    }
  
  }

  async loadFavoriteNotice(){

    this.storage.create();
    const favoritos = await this.storage.get('favoritos');

    if( favoritos ) {
      this.noticias = favoritos; //guardamos en el arreglo las noticias que esta en favoritos
    }



  }

  deleteNotice(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');//agregar toas
  }


}
