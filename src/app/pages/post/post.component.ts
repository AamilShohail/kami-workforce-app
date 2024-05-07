import { Component, OnInit } from '@angular/core';
import { Post } from '@app/models/posts.model';
import { PostService } from '@app/services/post.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  providers: [PostService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  posts!: Post[];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subscribeToPosts();
  }

  private subscribeToPosts(): void {
    this.postService
      .getAllPosts()
      .pipe(take(1))
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
}
