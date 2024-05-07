import { Component, OnInit } from '@angular/core';
import { Album } from '@app/models/album.model';
import { AlbumService } from '@app/services/album.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [],
  providers: [AlbumService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  albums!: Album[];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.subscribeToAlbums();
  }

  private subscribeToAlbums(): void {
    this.albumService
      .getAllAlbums()
      .pipe(take(1))
      .subscribe((albums: Album[]) => {
        this.albums = albums;
      });
  }
}
