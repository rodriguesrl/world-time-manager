import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimezoneSelectorPage } from './timezone-selector';

@NgModule({
  declarations: [
    TimezoneSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(TimezoneSelectorPage),
  ],
})
export class TimezoneSelectorPageModule {}
