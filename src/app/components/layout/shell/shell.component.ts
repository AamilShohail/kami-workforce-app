import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  activeUserId!: number;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.firstChild?.paramMap
      .pipe(take(1))
      .subscribe((params: ParamMap) => {
        this.activeUserId = Number(params.get('userId'));
      });
  }
}
