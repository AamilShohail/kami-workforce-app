import { Component, Input, OnInit } from '@angular/core';
import { Album } from '@app/models/album.model';
import { Post } from '@app/models/posts.model';
import { AlbumService } from '@app/services/album.service';
import { PostService } from '@app/services/post.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-summary',
  standalone: true,
  providers: [PostService, AlbumService],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  @Input() userId: number | undefined;

  postsCount!: number | null;
  albumsCount!: number | null;

  constructor(
    private postService: PostService,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.subscribeToPosts();
    this.subscribeToAlbums();
  }

  private subscribeToPosts(): void {
    this.postService
      .getAllPosts()
      .pipe(take(1))
      .subscribe((posts: Post[]) => {
        this.postsCount = posts.length;
      });
  }

  private subscribeToAlbums(): void {
    this.albumService
      .getAllAlbums()
      .pipe(
        take(1),
        map((albums: Album[]) =>
          albums.filter((album) => album.userId === this.userId)
        )
      )
      .subscribe((albums: Album[]) => {
        this.albumsCount = albums.length;
      });
  }
}
