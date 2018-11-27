import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchandiseViewPage } from './merchandise-view';

@NgModule({
  declarations: [
    MerchandiseViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchandiseViewPage),
  ],
})
export class MerchandiseViewPageModule {}
