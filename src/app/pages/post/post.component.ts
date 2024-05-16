import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@app/components/generic/grid/grid.component';
import { Post } from '@app/models/posts.model';
import { PostService } from '@app/services/post.service';
import { EMPTY, switchMap, take } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  routerLink!: string;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToPosts();
    this.createColumns();
    this.subscribeToPostById();
  }

  rowClick(post: Post): void {
    this.setupRouterLink(post);
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
        switchMap((params: ParamMap) => {
          const postIdFromRoute = Number(params.get('postId'));
          if (postIdFromRoute) {
            return this.postService.getPostById(postIdFromRoute);
          }
          return EMPTY;
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
      });
  }

  private setupRouterLink(post: Post): void {
    this.activatedRoute.parent?.paramMap.subscribe((params: ParamMap) => {
      this.routerLink = `/kami-workforce/user/${Number(
        params.get('userId')
      )}/posts/${post.id}`;
    });
  }
}
