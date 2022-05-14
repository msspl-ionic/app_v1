import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  
  public toggled: boolean = false;

  constructor(
    public loadingController: LoadingController
  ) {
    this.toggled = false;
  }
  
  ngOnInit() {
    this.presentLoadingWithOptions()
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

// slider jayanta
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay:true
   };

// slider jayanta
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "circles",
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


}
