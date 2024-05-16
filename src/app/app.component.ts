import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Kami Workforce App';

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${VERSION.full} ${this.title}`);
  }
}
