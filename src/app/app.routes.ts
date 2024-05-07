import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'kami-workforce/home',
    pathMatch: 'full',
  },
  {
    path: 'kami-workforce/home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'kami-workforce/home',
  },
];
