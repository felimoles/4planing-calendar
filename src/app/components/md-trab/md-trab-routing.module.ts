import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdTrabPage } from './md-trab.page';

const routes: Routes = [
  {
    path: '',
    component: MdTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdTrabPageRoutingModule {}
