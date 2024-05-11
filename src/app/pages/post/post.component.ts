import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@app/components/generic/grid/grid.component';
import { Post } from '@app/models/posts.model';
import { PostService } from '@app/services/post.service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';

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
  post!: Post;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToPosts();
    this.createColumns();
    this.subscribeToPostById();
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

  private subscribeToPostById(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          if (Number(params.get('postId'))) {
            return this.postService.getPostById(Number(params.get('postId')));
          }
          return EMPTY;
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
      });
  }
}
