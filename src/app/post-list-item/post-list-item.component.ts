import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postCreatedAt: string;
  @Input() postLoveIt: number;
  @Input() isLove: number;
  @Input() post: Post;

  constructor(private postService: PostService) { }

  ngOnInit(): any {}

  loveIt(isLove: number): any {
    isLove ? this.post.loveIt++ : this.post.loveIt--;
    this.postService.updatePost(this.post);
  }

  onLoveIt(isLove: number) {
    isLove = this.post.loveIt++;
    this.postService.savePosts();
  }

  onDontLoveIt(isLove: number) {
    isLove = this.post.loveIt--;
    this.postService.savePosts();
  }

  onDeletePost(post: Post): any {
    const confirmation = confirm('Voulez-vous supprimer ce post?');
    if (confirmation) {
      this.postService.removePost(post);
    }
  }
}
