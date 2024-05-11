import { Component, OnInit } from '@angular/core';
import { GridComponent } from '../generic/grid/grid.component';
import { User } from '@app/models/user.model';
import { ColDef } from 'ag-grid-community';
import { UserService } from '@app/services/user.service';
import { map, switchMap, take } from 'rxjs';
import { ShellComponent } from '../layout/shell/shell.component';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { ActivatedRouterService } from '@app/services/activated-router.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GridComponent, ShellComponent, RouterModule],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  colDefs!: ColDef<User>[];
  users!: User[];
  navigationButtonText!: string;
  routerLink!: string;
  currentUser!: User;

  constructor(
    private userService: UserService,
    private activatedRouterService: ActivatedRouterService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createColumns();
    this.subscribeToUsers();

    this.activatedRoute.paramMap.pipe(
      take(1),
      map((params: ParamMap) => {
        console.log(`user`, params.get('userId'));
        return Number(params.get('userId'));
      })
    );
  }

  rowClick(user: User): void {
    this.navigationButtonText = `Use as ${user.name}`;
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

  private subscribeToActivatedUser = () => {
    this.activatedRouterService
      .getActivatedId()
      .pipe(
        switchMap((activatedId: number) => {
          return this.userService.getUserById(activatedId);
        })
      )
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  };

  private setupRouterLink(user: User): void {
    this.routerLink = `/kami-workforce/user/${user.id}/home`;
  }
}
