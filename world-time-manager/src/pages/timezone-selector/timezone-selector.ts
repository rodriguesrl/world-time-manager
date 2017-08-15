import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import * as moment from 'moment-timezone';

@IonicPage()
@Component({
  selector: 'page-timezone-selector',
  templateUrl: 'timezone-selector.html',
})
export class TimezoneSelectorPage {
  zones;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events
  ){
    this.refreshList();
  }

  selectClock(zone) {
    this.event.publish('createNewClock', zone);
    this.navCtrl.pop();
  }

  refreshList() {
    this.zones = moment.tz.names();
  }

  filterList(ev) {
    this.refreshList();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.zones = this.zones.filter((zone) => {
        return (zone.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    };
  }

}
