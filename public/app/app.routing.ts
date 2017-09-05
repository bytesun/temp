import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { OverviewComponent } from './overview.component';

import { BlogComponent } from './blog/blog.component';
import { ThoughtComponent } from './thought/thought.component';
import { TodoComponent } from './todo/todo.component';
import { NoteComponent } from './note/note.component';

const appRoutes: Routes = [
  {
    path: 'blogs',
    component: BlogComponent
  },
  {
    path: 'thoughts',
    component: ThoughtComponent
  }, 
  {
    path: 'todos',
    component: TodoComponent
  },  
  {
    path: 'notes',
    component: NoteComponent
  },    
  {
    path: '',
    component: TodoComponent
  }
];
export const routing = RouterModule.forRoot(appRoutes);
