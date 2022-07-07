import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CommonService } from '../../shared/services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() logo: string;
  @Input() alt: string;
  @Input() header_right: string;
  public toggled: boolean = false;
  public profileImg: '';
  constructor(
    public loadingController: LoadingController,
    private common: CommonService,
  ) {
    this.toggled = false;
  }
  
  ngOnInit() {
    this.presentLoadingWithOptions();
    this.common._onProfileDataAll$.subscribe((data)=>{
			if(data) {
				console.log(data,"data");
        this.profileImg = data.profile_image;
				console.log(this.profileImg,"this.profileImg");
			}
		});
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
