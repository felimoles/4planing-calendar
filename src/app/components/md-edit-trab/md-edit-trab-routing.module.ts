import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdEditTrabPage } from './md-edit-trab.page';

const routes: Routes = [
  {
    path: '',
    component: MdEditTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdEditTrabPageRoutingModule {}
