import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ShellComponent } from './components/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/kami-workforce',
    pathMatch: 'full',
  },
  {
    path: 'kami-workforce',
    component: UserComponent,
  },
  {
    path: 'kami-workforce/user/:userId',
    component: ShellComponent,
    children: [
      {
        path: 'user',
        loadComponent: () =>
          import(`./pages/user/user.component`).then((m) => m.UserComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import(`./components/home/home.component`).then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'albums',
        loadComponent: () =>
          import('./pages/album/album.component').then((m) => m.AlbumComponent),
      },
      {
        path: 'albums/:albumId',
        loadComponent: () =>
          import('./pages/album/album.component').then((m) => m.AlbumComponent),
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
        path: 'settings',
        loadComponent: () =>
          import(`./pages/setting/setting.component`).then(
            (m) => m.SettingComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/post/post.component').then((m) => m.PostComponent),
      },
      {
        path: 'posts/:postId',
        loadComponent: () =>
          import('./pages/post/post.component').then((m) => m.PostComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/kami-workforce',
  },
];
