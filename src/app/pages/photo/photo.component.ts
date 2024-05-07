import { Component, OnInit } from '@angular/core';
import { Photo } from '@app/models/photo.model';
import { PhotoService } from '@app/services/photo.service';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  providers: [PhotoService],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent implements OnInit {
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
        map((photos: Photo[]) => photos.slice(0, 10))
      )
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
      });
  }
}
