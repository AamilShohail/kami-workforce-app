import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/kami-workforce/home',
    pathMatch: 'full',
  },
  {
    path: 'kami-workforce/home',
    component: HomeComponent,
  },
  {
    path: 'kami-workforce/home',
    component: HomeComponent,
    children: [
      {
        path: 'albums',
        loadComponent: () =>
          import('./pages/album/album.component').then((m) => m.AlbumComponent),
      },
      {
        path: 'albums/:id',
        loadComponent: () =>
          import('./pages/album/album.component').then((m) => m.AlbumComponent),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/post/post.component').then((m) => m.PostComponent),
      },
      {
        path: 'posts/:id',
        loadComponent: () =>
          import('./pages/post/post.component').then((m) => m.PostComponent),
      },
      {
        path: 'photos',
        loadComponent: () =>
          import('./pages/photo/photo.component').then((m) => m.PhotoComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/kami-workforce/home',
  },
];
