import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';
import { ListaPage } from '../pages/lista/lista';
import { MapaPage } from '../pages/mapa/mapa';
import { FeedbackPage } from '../pages/feedback/feedback';
import { Locations } from '../providers/locations';

import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    ListaPage,
    MapaPage,
    FeedbackPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    ListaPage,
    MapaPage,
    FeedbackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Locations,
    InAppBrowser,
    Geolocation,
    Diagnostic,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
