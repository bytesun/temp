import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


import { Note } from './note';
import { NoteService } from './note.service';

declare var tinymce: any;
@Component({
  templateUrl: 'app/templates/note.html',
})

export class NoteComponent implements OnInit {

  model = new Note();
  notes = [];
  categories = [
    { "id":1,
      "name": "Financial"
    },
    { "id":2,
      "name": "Web"
    },  
    { "id":3,
      "name": "Life"
    },    
    { "id":4,
      "name": "Sun"
    },    
    { "id":5,
      "name": "Carl"
    },
    { "id":6,
      "name": "Gloria"
    },  
    { "id":0,
      "name": "Other"
    }
    ];
  error = null;
  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    
    tinymce.init({
      selector: ".tinymce"
    });
  
    this.noteService
          .getNotes()
          .then(notes => {
            this.notes = notes;
            
          })
          .catch(error => this.error = error); // TODO: Display error message 
    
  }

  onSubmit(){
    this.model.content = tinymce.activeEditor.getContent();
    console.log(this.model);
    
    this.noteService.newNote(this.model)
      .then(note => {

            this.model = new Note();
            this.notes.push(note);
          })
      .catch(error => this.error = error); // TODO: Display error message      
  }
  
  delNote(id,index){
    console.log("delete note :"+id);
    this.noteService
      .delNote(id)
      .then(data => {
            this.notes.splice(index,1);

          })
      .catch(error => this.error = error); // TODO: Display error message        
  }

  goBack() {
    window.history.back();
  }
}
