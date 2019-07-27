import { Component, OnInit } from '@angular/core';
import { ConfigStore } from '../../stores/config/config.store';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  image: string;

  constructor(private config: ConfigStore) { }

  ngOnInit() {
    this.config.theme.subscribe((theme) => this.image = `assets/img/page_not_found_${theme}.svg`);
  }

}
