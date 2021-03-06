import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public posts: Post[] = [];
  subscriptions: Subscription = new Subscription();
  searchStr = '';

  constructor(
    private postService:PostService,
    private alert: AlertService
  ) { }
 
  ngOnInit(): void {
    this.subscriptions.add(this.postService.getAll().subscribe(post =>{
      this.posts = post
      console.log(post);
    }))
  }

  remove(id: any) {
    this.subscriptions.add(this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.warning('Post has been deleted');
    }))
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
