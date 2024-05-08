import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@app/components/generic/grid/grid.component';
import { Post } from '@app/models/posts.model';
import { PostService } from '@app/services/post.service';
import { take } from 'rxjs';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [GridComponent],
  providers: [PostService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  colDefs!: ColDef<Post>[];
  posts!: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subscribeToPosts();
    this.createColumns();
  }

  private subscribeToPosts(): void {
    this.postService
      .getAllPosts()
      .pipe(take(1))
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  private createColumns(): void {
    this.colDefs = [
      { field: 'id', hide: true },
      { field: 'title', filter: true, floatingFilter: true },
      { field: 'body', filter: true, floatingFilter: true },
    ];
  }
}
