import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdAddTrabPage } from './md-add-trab.page';

const routes: Routes = [
  {
    path: '',
    component: MdAddTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdAddTrabPageRoutingModule {}
