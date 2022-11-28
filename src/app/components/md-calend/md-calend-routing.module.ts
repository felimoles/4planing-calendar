import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdCalendPage } from './md-calend.page';

const routes: Routes = [
  {
    path: '',
    component: MdCalendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdCalendPageRoutingModule {}
