import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlbumComponent } from './pages/album/album.component';
import { PostComponent } from './pages/post/post.component';
import { PhotoComponent } from './pages/photo/photo.component';

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
    path: 'kami-workforce/home/albums',
    component: AlbumComponent,
  },
  {
    path: 'kami-workforce/home/albums/:id',
    component: AlbumComponent,
  },
  {
    path: 'kami-workforce/home/posts',
    component: PostComponent,
  },
  {
    path: 'kami-workforce/home/photos',
    component: PhotoComponent,
  },
  {
    path: '**',
    redirectTo: 'kami-workforce/home',
  },
];
