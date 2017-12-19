import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {

  goLista() {
    this.navCtrl.push(ListaPage);
  }

  constructor(public navCtrl: NavController, private inAppBrowser: InAppBrowser) {

  }

  launch(url) {
    this.inAppBrowser.create(url);
  }
}
