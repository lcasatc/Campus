import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import 'rxjs/add/operator/filter';

declare var google;
declare var navigator: any;

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  subscription: any;

  latPredio: any;
  lngPredio: any;
  imageOverlay: any;
  numeroPredio: any;

  constructor(public navParams: NavParams, private diagnostic:Diagnostic, private alertCtrl:AlertController, private paltform:Platform, public geolocation: Geolocation) {
    this.latPredio = this.navParams.get("latitude");
    this.lngPredio = this.navParams.get("longitude");
    this.numeroPredio = this.navParams.get("numero");
  }

  ionViewDidLoad() {
    this.diagnostic.getLocationMode().then((state) => {
      if(state == this.diagnostic.locationMode.LOCATION_OFF) {
        let alert = this.alertCtrl.create({
          title: 'Ir para configurações',
          message: 'Para utilizar o Campus App você precisa ativar a localização e GPS.',
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        alert.present();
      }
    })

    this.initMap();

    let options = {
      maximumAge: 30000,
      timeout: 27000,
      enableHighAccuracy: true
    };

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP
    })
    this.subscription = this.geolocation.watchPosition(options).subscribe(position => {
      let myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      marker.setPosition(myLatLng);
    })
  }

  initMap(){

          let latLng = new google.maps.LatLng(-28.7040281, -49.4073988);

          let mapOptions = {
            center: latLng,
            zoom: 17,
            minZoom:16,
            maxZoom:20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false
          }

          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


    var mapaImage = 'assets/images/mapa.png';

    var imgBounds = {
    north: -28.700890,
    south: -28.706979,
    east: -49.404607,
    west: -49.408760
  }

    this.addMarkerPredio(this.latPredio, this.lngPredio, this.numeroPredio);

    this.addMarkerLocais();

    var campusOverlay = new google.maps.GroundOverlay(mapaImage,imgBounds);

    campusOverlay.setMap(this.map);
  }

  addMarkerPredio(latitude, longitude, numero) {

    var myLatLng = {lat: latitude, lng: longitude};

    var iconPredioNumero = 'assets/images/numbers/number_' + numero + '.png';

    let marker = new google.maps.Marker({
      map: this.map,
      position: myLatLng,
      icon: iconPredioNumero,
      animation: google.maps.Animation.BOUNCE
      });
  }

  addMarkerLocais() {
    var cc = new google.maps.Marker({
    position: new google.maps.LatLng(-28.703839, -49.405938),
    map: this.map,
    icon: 'assets/images/places/burger.png'
  });
  var refeitorio1 = new google.maps.Marker({
    position: new google.maps.LatLng(-28.702784, -49.406011),
    map: this.map,
    icon: 'assets/images/places/burger.png'
  });
  var refeitorio2 = new google.maps.Marker({
    position: new google.maps.LatLng(-28.705579, -49.406197),
    map: this.map,
    icon: 'assets/images/places/burger.png'
  });
  var biblioteca = new google.maps.Marker({
    position: new google.maps.LatLng(-28.703072, -49.406068),
    map: this.map,
    icon: 'assets/images/places/library.png'
  });
  var campo = new google.maps.Marker({
    position: new google.maps.LatLng(-28.704094, -49.408016),
    map: this.map,
    icon: 'assets/images/places/soccer.png'
  });
  var quadra = new google.maps.Marker({
    position: new google.maps.LatLng(-28.705439, -49.406726),
    map: this.map,
    icon: 'assets/images/places/soccer.png'
  });
  var quadraBasquete = new google.maps.Marker({
    position: new google.maps.LatLng(-28.704578, -49.407308),
    map: this.map,
    icon: 'assets/images/places/basketball.png'
  });
  }
}
