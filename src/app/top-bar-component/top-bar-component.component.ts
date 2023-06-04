import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-component',
  templateUrl: './top-bar-component.component.html',
  styleUrls: ['./top-bar-component.component.scss']
})
export class TopBarComponentComponent {
  constructor(
    private router: Router
  ){}
  changeRoute() {
    this.router.navigate(['cart'])
  }
}
