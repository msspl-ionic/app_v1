import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ApiService } from '../../shared/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs1',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
