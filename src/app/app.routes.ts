import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/kami-workforce/user',
    pathMatch: 'full',
  },
  {
    path: 'kami-workforce/user',
    component: UserComponent,
  },
  {
    path: 'kami-workforce/user',
    component: UserComponent,
    children: [
      {
        path: ':userId/home',
        loadComponent: () =>
          import(`./components/home/home.component`).then(
            (m) => m.HomeComponent
          ),
        children: [
          {
            path: 'albums',
            loadComponent: () =>
              import('./pages/album/album.component').then(
                (m) => m.AlbumComponent
              ),
          },
          {
            path: 'albums/:id',
            loadComponent: () =>
              import('./pages/album/album.component').then(
                (m) => m.AlbumComponent
              ),
          },
          {
            path: 'posts',
            loadComponent: () =>
              import('./pages/post/post.component').then(
                (m) => m.PostComponent
              ),
          },
          {
            path: 'posts/:id',
            loadComponent: () =>
              import('./pages/post/post.component').then(
                (m) => m.PostComponent
              ),
          },
          {
            path: 'photos',
            loadComponent: () =>
              import('./pages/photo/photo.component').then(
                (m) => m.PhotoComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/kami-workforce/user',
  },
];
