import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  activeUserId!: number;
  sidebarExpanded = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.activeUserId = Number(params.get('userId'));
    });
  }
}
