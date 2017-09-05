import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Thought } from './thought';
import { ThoughtService } from './thought.service';

declare var tinymce: any;
@Component({
  templateUrl: 'app/templates/thought.html',
})

export class ThoughtComponent implements OnInit {
  model = new Thought();
  thoughts = [];
  
  error = null;
  constructor(
    private thoughtService: ThoughtService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    
    tinymce.init({
      selector: ".tinymce"
    });
  
    this.thoughtService
          .getThoughts()
          .then(thoughts => {
            this.thoughts = thoughts;
            
          })
          .catch(error => this.error = error); // TODO: Display error message 
    
  }

  onSubmit(){
    this.model.content = tinymce.activeEditor.getContent();
    console.log(this.model);
    
    this.thoughtService.newThought(this.model)
      .then(thought => {

            this.model = new Thought();
            this.thoughts.push(thought);
          })
      .catch(error => this.error = error); // TODO: Display error message      
  }
  
  delThought(id,index){
    console.log("delete thought :"+id);
    this.thoughtService
      .delThought(id)
      .then(data => {
            this.thoughts.splice(index,1);

          })
      .catch(error => this.error = error); // TODO: Display error message        
  }

  goBack() {
    window.history.back();
  }
}
