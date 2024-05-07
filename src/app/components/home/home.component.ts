import { Component } from '@angular/core';
import { ShellComponent } from '../layout/shell/shell.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShellComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
