import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})

export class PostService {

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  emitPosts(): any {
    this.postSubject.next(this.posts);
  }

  // Sauvegarde des posts sur le serveur
  savePosts(): any {
    firebase.database().ref('/posts').set(this.posts);
  }

  // Récupère les posts depuis le serveur
  getPosts(): any {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }

  updatePost(post: Post): any {
    const postIntexToUpdate = this.posts.findIndex(
        (postEl) => {
            if (postEl === post) {
                return true;
            }
        }
    )
    this.posts[postIntexToUpdate] = post;
    this.savePosts();
    this.emitPosts();
}

  // Récupère un post unique
  getSinglePost(id: number): any {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Création d'un nouveau post
  createNewPost(newPost: Post): any {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  // Suppression d'un post
  removePost(post: Post): any {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

}
