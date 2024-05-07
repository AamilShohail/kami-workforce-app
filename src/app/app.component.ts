import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // may change this to your app's title
  title = 'custom-angular-framework';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${VERSION.full} ${this.title}`);
  }
}
