import { Component,  OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): any {
    this.postsSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  onNewPost(): any {
    this.router.navigate(['/posts', 'new']);
  }

  onViewPost(id: number): any {
    this.router.navigate(['/posts', 'view', id]);
  }

  ngOnDestroy(): any {
    this.postsSubscription.unsubscribe();
  }
}
