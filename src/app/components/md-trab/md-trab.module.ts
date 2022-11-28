import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdTrabPageRoutingModule } from './md-trab-routing.module';

import { MdTrabPage } from './md-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdTrabPageRoutingModule
  ],
  declarations: [MdTrabPage]
})
export class MdTrabPageModule {}
