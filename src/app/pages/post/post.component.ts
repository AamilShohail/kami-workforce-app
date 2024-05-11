import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@app/components/generic/grid/grid.component';
import { Post } from '@app/models/posts.model';
import { PostService } from '@app/services/post.service';
import { switchMap, take } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { ActivatedRouterService } from '@app/services/activated-router.service';

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
  currentSelectedPost!: Post;

  constructor(
    private postService: PostService,
    private activatedRouterService: ActivatedRouterService
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
    this.activatedRouterService
      .getActivatedId()
      .pipe(
        switchMap((activatedId: number) => {
          return this.postService.getPostById(activatedId);
        })
      )
      .subscribe((post: Post) => {
        this.currentSelectedPost = post;
      });
  }
}
