import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'md-calend',
    loadChildren: () => import('./components/md-calend/md-calend.module').then( m => m.MdCalendPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./home/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'md-trab',
    loadChildren: () => import('./components/md-trab/md-trab.module').then( m => m.MdTrabPageModule)
  },
  {
    path: 'md-add-trab',
    loadChildren: () => import('./components/md-add-trab/md-add-trab.module').then( m => m.MdAddTrabPageModule)
  },
  {
    path: 'md-edit-trab',
    loadChildren: () => import('./components/md-edit-trab/md-edit-trab.module').then( m => m.MdEditTrabPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
