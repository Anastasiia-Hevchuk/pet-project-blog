import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { fbCreateResponce, Post } from './interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbDB}/posts.json`, post).pipe(
        //@ts-ignore
      map((response: fbCreateResponce) => {
        const newPost: Post = {
          ...post,
          id: response.name,
          date: new Date(post.date)
        };
        return newPost;
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDB}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  } 

  
  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDB}/posts/${id}.json`)
      .pipe(map((post: Post) => {
        return {
          ...post, id,
          date: new Date(post.date)
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDB}/posts/${id}.json`)
  }
  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDB}/posts/${post.id}.json`, post)
  }
  
};
