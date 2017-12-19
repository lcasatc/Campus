import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Locations } from '../../providers/locations';
import { MapaPage } from '../mapa/mapa';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {

  private _items: any[];
  private _location: Locations;

  public get listLocations() : any[] {
    return this._items;
  }

  constructor(public navCtrl: NavController) {
    this._location = new Locations();
    this.initializeItems();
  }

  encontrarPredio(latitude, longitude, numero) {
    this.navCtrl.push(MapaPage, {
      latitude,
      longitude,
      numero
    });
  }

  initializeItems() {
    this._items = this._location.getLocations();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._items = this._items.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
