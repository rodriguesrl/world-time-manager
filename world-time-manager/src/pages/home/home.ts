import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  time;

  constructor(public navCtrl: NavController) {
    //this.time = Date.now();
    setInterval(() => {
      this.time = moment().format('LTS');
    }, 1000)
  }

}
