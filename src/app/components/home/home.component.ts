import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EMPTY, switchMap } from 'rxjs';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user.model';
import { SummaryComponent } from '@app/pages/summary/summary.component';
import { ShellComponent } from '../layout/shell/shell.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SummaryComponent, ShellComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  sidebarExpanded = false;
  currentUser!: User | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserById();
  }

  private subscribeToUserById(): void {
    this.activatedRoute.parent?.paramMap
      .pipe(
        switchMap((params) => {
          const userIdFromRoute = Number(params.get('userId'));
          if (userIdFromRoute) {
            return this.userService.getUserById(userIdFromRoute);
          }
          return EMPTY;
        })
      )
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }
}
