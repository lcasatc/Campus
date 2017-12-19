import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { InicioPage } from '../inicio/inicio';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
    mensagem: any;
    constructor(public navCtrl: NavController, private emailComposer: EmailComposer) {
    }


  sendEmail() {
    let email = {
      to: 'henrique.piati@hotmail.com',
      subject: '[Feedback] - Campus App',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
    this.navCtrl.push(InicioPage);
  }
}
