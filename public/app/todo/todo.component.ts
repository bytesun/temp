import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Todo } from './todo';
import { TodoService } from './todo.service';

declare var tinymce: any;
@Component({
  templateUrl: 'app/templates/todo.html',
})

export class TodoComponent implements OnInit {

  model = new Todo();
  todos = [];
  
  error = null;
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    
    tinymce.init({
      selector: ".tinymce"
    });
  
    this.todoService
          .getTodos()
          .then(todos => {
            this.todos = todos;
            
          })
          .catch(error => this.error = error); // TODO: Display error message 
    
  }

  onSubmit(){
    
    console.log(this.model);
    
    this.todoService.newTodo(this.model)
      .then(todo => {

            this.model = new Todo();
            this.todos.push(todo);
          })
      .catch(error => this.error = error); // TODO: Display error message      
  }
  
  delTodo(id,index){
    console.log("delete todo :"+id);
    this.todoService
      .delTodo(id)
      .then(data => {
            this.todos.splice(index,1);

          })
      .catch(error => this.error = error); // TODO: Display error message        
  }

  goBack() {
    window.history.back();
  }
}
