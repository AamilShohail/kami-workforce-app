import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from '@app/components/generic/grid/grid.component';
import { ShellComponent } from '@app/components/layout/shell/shell.component';
import { User } from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { ColDef } from 'ag-grid-community';
import { EMPTY, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GridComponent, ShellComponent],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  colDefs!: ColDef<User>[];
  users!: User[];
  routerLink!: string;
  currentUser!: User;
  navigationButtonText!: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createColumns();
    this.subscribeToUsers();
    this.subscribeToUserById();
  }

  rowClick(user: User): void {
    this.navigationButtonText = `Login as ${user.name}`;
    this.setupRouterLink(user);
  }

  private createColumns(): void {
    this.colDefs = [
      { field: 'id', hide: true },
      { field: 'name', filter: true, floatingFilter: true },
      { field: 'username', filter: true, floatingFilter: true },
      { field: 'email', filter: true, floatingFilter: true },
      { field: 'phone', filter: true, floatingFilter: true },
    ];
  }

  private subscribeToUsers(): void {
    this.userService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  private setupRouterLink(user: User): void {
    this.routerLink = `/kami-workforce/user/${user.id}/home`;
  }

  private subscribeToUserById(): void {
    this.activatedRoute.firstChild?.paramMap
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
