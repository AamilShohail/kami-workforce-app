import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CardComponent } from '@app/components/generic/card/card.component';
import { Album } from '@app/models/album.model';
import { AlbumService } from '@app/services/album.service';
import { EMPTY, Observable, map, switchMap, take } from 'rxjs';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CardComponent, CommonModule, PhotoComponent],
  providers: [AlbumService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  albums!: Album[];
  album!: Album;
  albumId!: number;
  routerLink!: string;

  private activeUserId!: number;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getActiveUserId();
    this.subscribeToAlbumById();
    this.subscribeToAlbums();
  }

  setupRouterLink = (album: Album): Observable<string> | undefined =>
    this.activatedRoute.parent?.paramMap.pipe(
      take(1),
      map((params: ParamMap) => {
        return `/kami-workforce/user/${Number(
          params.get('userId')
        )}/home/albums/${album.id}`;
      })
    );

  private subscribeToAlbums(): void {
    this.albumService
      .getAllAlbums()
      .pipe(
        take(1),
        map((albums: Album[]) =>
          albums.filter((album) => album.userId === this.activeUserId)
        )
      )
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });
  }

  private subscribeToAlbumById(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const albumIdFromRoute = Number(params.get('albumId'));
          if (albumIdFromRoute) {
            return this.albumService.getAlbumById(
              Number(params.get('albumId'))
            );
          }
          return EMPTY;
        })
      )
      .subscribe((album) => {
        this.album = album;
      });
  }

  private getActiveUserId(): void {
    this.activatedRoute.parent?.paramMap
      .pipe(take(1))
      .subscribe((params: ParamMap) => {
        this.activeUserId = Number(params.get('userId'));
      });
  }
}
