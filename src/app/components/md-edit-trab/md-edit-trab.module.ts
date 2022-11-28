import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdEditTrabPageRoutingModule } from './md-edit-trab-routing.module';

import { MdEditTrabPage } from './md-edit-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdEditTrabPageRoutingModule
  ],
  declarations: [MdEditTrabPage]
})
export class MdEditTrabPageModule {}
