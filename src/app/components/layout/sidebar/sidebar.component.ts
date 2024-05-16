import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { MenuItem } from '@app/models/layout/menu-item.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;

  @Output() toggleSidebar = new EventEmitter<boolean>();

  navItems!: MenuItem[];

  private currentUserId!: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getActivatedUrl();
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  private getActivatedUrl() {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.currentUserId = Number(params.get('userId'));
      this.setupNavItems();
    });
  }

  private setupNavItems = (): void => {
    const relativeUrl = `/kami-workforce/user/${this.currentUserId}/`;
    this.navItems = [
      {
        id: 'home',
        icon: 'bi bi-house',
        label: 'Dashboard',
        link: `${relativeUrl}/home`,
      },
      {
        id: 'setting',
        icon: 'bi bi-gear',
        label: 'Settings',
        link: `${relativeUrl}/settings`,
      },
      {
        id: 'album',
        icon: 'bi bi-images',
        label: 'Albums',
        link: `${relativeUrl}/albums`,
      },
      {
        id: 'post',
        icon: 'bi bi-stickies-fill',
        label: 'Posts',
        link: `${relativeUrl}/posts`,
      },
    ];
  };
}
