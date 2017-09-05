import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { HttpModule }    from '@angular/http';
import {CookieService} from 'angular2-cookie/core';



import { AppComponent }  from './app.component';
import { routing }        from './app.routing';


import { BlogService } from './blog/blog.service';
import { BlogComponent } from './blog/blog.component';

import { ThoughtService } from './thought/thought.service';
import { ThoughtComponent } from './thought/thought.component';

import { TodoService } from './todo/todo.service';
import { TodoComponent } from './todo/todo.component';

import { NoteService } from './note/note.service';
import { NoteComponent } from './note/note.component';
@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
    ],
  providers: [
    CookieService,
    BlogService,
    ThoughtService,
    TodoService,
    NoteService

    
  ],    
  declarations: [ 
    AppComponent,
    BlogComponent,
    ThoughtComponent,
    TodoComponent,
    NoteComponent

  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
