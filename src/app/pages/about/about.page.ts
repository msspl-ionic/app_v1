import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  public toggled: boolean = false;

  constructor() {
    this.toggled = false;
  }

  ngOnInit() {
  }

  // header search jayanta

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  public closeSearch(event: Event) {
    event.preventDefault();
    this.toggled = false;
  }

// header search jayanta

}
