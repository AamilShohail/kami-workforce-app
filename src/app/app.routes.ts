import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';

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
      },
    ],
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
            path: 'settings',
            loadComponent: () =>
              import('./pages/setting/setting.component').then(
                (m) => m.SettingComponent
              ),
          },
          {
            path: 'albums/:albumId',
            loadComponent: () =>
              import('./pages/album/album.component').then(
                (m) => m.AlbumComponent
              ),
            children: [
              {
                path: 'photos/:photoId',
                loadComponent: () =>
                  import('./pages/photo/photo.component').then(
                    (m) => m.PhotoComponent
                  ),
              },
            ],
          },
          {
            path: 'posts',
            loadComponent: () =>
              import('./pages/post/post.component').then(
                (m) => m.PostComponent
              ),
          },
          {
            path: 'posts/:postId',
            loadComponent: () =>
              import('./pages/post/post.component').then(
                (m) => m.PostComponent
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
