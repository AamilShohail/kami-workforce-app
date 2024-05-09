import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@app/components/generic/card/card.component';
import { Album } from '@app/models/album.model';
import { AlbumService } from '@app/services/album.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CardComponent],
  providers: [AlbumService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  albums!: Album[];
  album!: Album;
  albumId!: number;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToAlbums();
    this.subscribeToActivatedRoutes();
    this.subscribeToAlbumById();
  }

  private subscribeToAlbums(): void {
    this.albumService
      .getAllAlbums()
      .pipe(take(1))
      .subscribe((albums: Album[]) => {
        this.albums = albums;
        console.log(albums);
      });
  }

  private subscribeToActivatedRoutes(): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params) => {
      this.albumId = Number(params.get('id'));
    });
  }

  private subscribeToAlbumById(): void {
    this.albumService
      .getAlbumById(this.albumId)
      .pipe(take(1))
      .subscribe((albums: Album) => {
        this.album = albums;
      });
  }
}
