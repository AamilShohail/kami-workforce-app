import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { switchMap, EMPTY } from 'rxjs';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
})
export class SettingComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      website: new FormControl(''),
      phone: new FormControl(''),
    });
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
        this.formGroup.patchValue(user);
      });
  }
}
