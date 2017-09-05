import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Headers, Http } from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TodoService {
    private basicUrl = 'api/todos';  // URL to web api
    constructor(private http: Http,
    private _cookieService: CookieService) { }

	
	newTodo(todo: Todo){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('X-CSRFToken', this._cookieService.get("csrftoken"));    
      // headers.append('Authorization', "JWT "+localStorage.getItem('token')); 
      return this.http.post(this.basicUrl,JSON.stringify(todo), {headers: headers})
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);  		
	}
  getTodos() {
      let headers = new Headers();
      // headers.append('X-CSRFToken', this._cookieService.get("csrftoken"));    
      // headers.append('Authorization', "JWT "+localStorage.getItem('token')); 
      return this.http.get(this.basicUrl, {headers: headers})
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);    
  }
  
  delTodo(id: string){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('X-CSRFToken', this._cookieService.get("csrftoken"));    
      // headers.append('Authorization', "JWT "+localStorage.getItem('token')); 
      return this.http.delete(this.basicUrl+"/"+id)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);      
  }    
	private handleError(error: any) {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}
}