import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.theme.subscribe((theme) => this.image = `assets/img/auth_${theme}.svg`);
  }
}
