import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [RouterModule],
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imgUrl!: string;
  @Input() title!: string;
  @Input() routerLink!: string | null;
}
