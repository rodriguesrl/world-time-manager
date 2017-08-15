import { Injectable } from '@angular/core';
import { Events, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilsProvider {

  loading;

  constructor(
    public event: Events,
    public loadingCtrl: LoadingController
  ) {
    this.subscribeEvents();
  }

  subscribeEvents(){
    this.event.subscribe('loadingStart', () => {
      this.loading = this.loadingCtrl.create({
        content: 'Loading Timezones...'
      });

      this.loading.present();
    });

    this.event.subscribe('loadingStop', () => {
      this.loading.dismiss();
    });
  }

}
