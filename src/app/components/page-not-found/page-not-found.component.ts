import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  image: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.theme.subscribe((theme) => this.image = `assets/img/page_not_found_${theme}.svg`);
  }

}
