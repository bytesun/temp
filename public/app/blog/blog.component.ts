import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Blog } from './blog';
import { BlogService } from './blog.service';

declare var tinymce: any;
@Component({
  templateUrl: 'app/templates/blog.html',
})

export class BlogComponent implements OnInit {

  model = new Blog();
  blogs = [Blog];
  error: string = null; 
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    
    tinymce.init({
      selector: ".tinymce"
    });
  
    this.blogService
          .getBlogs()
          .then(blogs => {
            this.blogs = blogs;
            
          })
          .catch(error => this.error = error); // TODO: Display error message 
    
  }

  onSubmit(){
    this.model.content = tinymce.activeEditor.getContent();
    console.log(this.model);
    
    this.blogService.newBlog(this.model)
      .then(blog => {
            this.model = new Blog();
            this.blogs.push(blog);
          })
      .catch(error => this.error = error); // TODO: Display error message      
  }
  
  delBlog(id,index){
    console.log("delete blog :"+id);
    this.blogService
      .delBlog(id)
      .then(data => {
            this.blogs.splice(index,1);

          })
      .catch(error => this.error = error); // TODO: Display error message        
  }

  goBack() {
    window.history.back();
  }
}
