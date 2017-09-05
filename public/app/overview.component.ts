import { Component } from '@angular/core';

@Component({
  template: `
    <br>
    <h1>AMSUN Administration Console</h1>
    <hr>
    {{now}}
  `
})
export class OverviewComponent {
  
  now = new Date();
}
