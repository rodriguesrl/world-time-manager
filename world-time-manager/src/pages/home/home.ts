import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TimezoneSelectorPage } from '../timezone-selector/timezone-selector';
import * as moment from 'moment-timezone';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  time;
  tz;
  local;

  constructor(public navCtrl: NavController) {
    this.local = moment.tz.guess();
    this.startClocks();
  }

  startClocks() {
    setInterval(() => {
      this.time = moment().format('LTS');
      this.tz = moment().tz("europe/berlin").format('LTS');
    }, 1000)
  };

  addClock() {
    this.navCtrl.push(TimezoneSelectorPage)
  };
}
