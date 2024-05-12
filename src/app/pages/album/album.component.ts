import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CardComponent } from '@app/components/generic/card/card.component';
import { Album } from '@app/models/album.model';
import { AlbumService } from '@app/services/album.service';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CardComponent, CommonModule],
  providers: [AlbumService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  albums!: Album[];
  album!: Album;
  albumId!: number;
  routerLink!: string;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToAlbums();
    this.subscribeToAlbumById();
  }

  private subscribeToAlbums(): void {
    this.albumService
      .getAllAlbums()
      .pipe(take(1))
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });
  }

  private subscribeToAlbumById(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) =>
          this.albumService.getAlbumById(Number(params.get('albumId')))
        )
      )
      .subscribe((album) => {
        this.album = album;
      });
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
}
