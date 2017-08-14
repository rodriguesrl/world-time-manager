import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage';
import * as moment from 'moment-timezone';



@Injectable()
export class DataManagerProvider {

  constructor(public nativeStorage: NativeStorage) {}

  guessTimezone(){
    return moment.tz.guess();
  }

  checkStorage() {
    return this.nativeStorage.getItem('data')
  }

  saveData(data) {
    this.nativeStorage.setItem('data', data).then(() => {
      console.log('Ok');
    }, error => {
      console.log(error);
    });
  }

  getData() {
    return this.nativeStorage.getItem('data')
  }

}
