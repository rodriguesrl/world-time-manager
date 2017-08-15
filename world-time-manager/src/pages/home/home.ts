import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';
import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data = {
    'clocks': [],
    'locale': ''};
  clocks = [{'clock': null, 'name': null}];
  timer;

  constructor(public navCtrl: NavController,
    public params: NavParams,
    public dataManager: DataManagerProvider,
    public event: Events,
    public alertCtrl: AlertController
  ){

    this.event.subscribe('createNewClock', zone => {
      this.data['clocks'][this.data['clocks'].length] = zone
      this.dataManager.saveData(this.data);
      this.startClocks();
    });

    this.dataManager.checkStorage().then(() => {
      this.dataManager.getData().then(data => {
        this.data = data;
        moment.locale(this.data['locale']);
        this.startClocks();
      });
    }, () => {
      this.firstRun();
    });
  }

  startClocks() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      for (let clock in this.data['clocks']) {
        if (this.clocks[clock]) {
          this.clocks[clock]['clock'] = moment().tz(this.data['clocks'][clock]).format('LT, L');
          this.clocks[clock]['name'] = this.data['clocks'][clock];
        } else {
          this.clocks = this.clocks.concat({
            'clock': moment().tz(this.data['clocks'][clock]).format('LT, L'),
            'name': this.data['clocks'][clock]});
        };
      };
    }, 1000);
  };

  addClock() {
    console.log('page');
    this.navCtrl.push('TimezoneSelectorPage')
  };

  deleteClock(clock) {
    this.data['clocks'].splice(this.clocks.indexOf(clock), 1);
    this.clocks.splice(clock, 1);
    this.dataManager.saveData(this.data);
  };

  createReminder() {
    console.log("Should create Reminder");
    moment.locale('en');
  };

  firstRun() {
    this.data['clocks'][0] = this.dataManager.guessTimezone();
    this.data['locale'] = 'en';
    moment.locale(this.data['locale']);
    this.dataManager.saveData(this.data);
    this.startClocks();
    let alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Since this is the first time you open the app we tried to guess your Timezone. Feel free to delete the standart clock anytime!',
      buttons: ['Ok']
    });
    alert.present();

  };

  changeLang() {
    let alert = this.alertCtrl.create({
      title: 'Language',
      inputs: [
        {type: 'radio', label: 'Português Brasileiro', value: 'pt-br', checked: true},
        {type: 'radio', label: 'English', value: 'en'},],
      buttons: [
        'Cancel',
        {
          text: 'OK',
          handler: data => {
            moment.locale(data);
            this.data['locale'] = data;
            this.dataManager.saveData(this.data);
          }
        }]
    });
    alert.present();
  }

}
