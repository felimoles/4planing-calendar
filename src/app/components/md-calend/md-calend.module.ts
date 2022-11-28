import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdCalendPageRoutingModule } from './md-calend-routing.module';

import { MdCalendPage } from './md-calend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdCalendPageRoutingModule
  ],
  declarations: [MdCalendPage]
})
export class MdCalendPageModule {}
