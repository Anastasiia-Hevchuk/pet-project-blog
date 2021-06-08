import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
 //@ts-ignore
 public  form = new FormGroup({
  title: new FormControl(null, [ Validators.required]),
  text: new FormControl(null, [ Validators.required]),
 
})

  constructor(private postService: PostService,     private alert: AlertService) { }

  ngOnInit(): void {

  }

  submit(){

    if(!this.form.valid){
      return
    }
    const post:Post = {
      title: this.form.value.title,
      author: 'admin',
      text: this.form.value.text,
      date: new Date()
    }

    this.postService.create(post).subscribe(()=>{
      this.form.reset();
      this.alert.success('Post has been created');
    })

    console.log(post);

  }

}
