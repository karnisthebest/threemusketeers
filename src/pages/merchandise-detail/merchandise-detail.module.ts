import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchandiseDetailPage } from './merchandise-detail';

@NgModule({
  declarations: [
    MerchandiseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchandiseDetailPage),
  ],
})
export class MerchandiseDetailPageModule {}
