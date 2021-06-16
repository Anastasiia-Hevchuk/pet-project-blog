import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  public form!: FormGroup;
  
  post!: Post; 
  submitted = false
  subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe((post: any) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.subscriptions.add(this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Post has been updating')
    }))
  }
}

