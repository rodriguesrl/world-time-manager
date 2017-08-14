import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import * as moment from 'moment-timezone';

@IonicPage()
@Component({
  selector: 'page-timezone-selector',
  templateUrl: 'timezone-selector.html',
})
export class TimezoneSelectorPage {
  zones = moment.tz.names();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events
  ){}

  selectClock(zone) {
    this.event.publish('createNewClock', zone);
    this.navCtrl.pop();
  }

}
