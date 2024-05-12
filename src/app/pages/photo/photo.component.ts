import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '@app/components/generic/card/card.component';
import { Photo } from '@app/models/photo.model';
import { PhotoService } from '@app/services/photo.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CardComponent],
  providers: [PhotoService],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent implements OnInit {
  @Input() albumId!: number;

  photos!: Photo[];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.subscribeToPosts();
  }

  private subscribeToPosts(): void {
    this.photoService
      .getAllPhotos()
      .pipe(
        take(1),
        map((photos: Photo[]) =>
          photos.filter((photo) => photo.albumId === this.albumId)
        )
      )
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
      });
  }
}
