import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PiePage } from './pie';

@NgModule({
  declarations: [
    PiePage,
  ],
  imports: [
    IonicPageModule.forChild(PiePage),
  ],
})
export class PiePageModule {}
