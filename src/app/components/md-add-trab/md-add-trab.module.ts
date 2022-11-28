import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdAddTrabPageRoutingModule } from './md-add-trab-routing.module';

import { MdAddTrabPage } from './md-add-trab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdAddTrabPageRoutingModule
  ],
  declarations: [MdAddTrabPage]
})
export class MdAddTrabPageModule {}
