import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { EMPTY, switchMap } from 'rxjs';
import { UserService } from '@app/services/user.service';
import { User } from '@app/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  sidebarExpanded = false;
  currentUser!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserById();
  }

  private subscribeToUserById(): void {
    this.activatedRoute.paramMap
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
