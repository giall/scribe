import { Component, OnInit } from '@angular/core';
import { ConfigStore } from '../../stores/config/config.store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  theme: Observable<Theme>;

  constructor(private config: ConfigStore) { }

  ngOnInit() {
    this.theme = this.config.theme;
  }

}
