import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CardComponent } from '@app/components/generic/card/card.component';
import { Photo } from '@app/models/photo.model';
import { PhotoService } from '@app/services/photo.service';
import { EMPTY, Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CardComponent, CommonModule],
  providers: [PhotoService],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent implements OnInit {
  @Input() albumId!: number;

  photos!: Photo[];
  photo!: Photo;
  currentUrl!: string;

  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeToPhotos();
    this.subscribeToPhotoById();
  }

  setupRouterLink = (photo: Photo): Observable<string> | undefined =>
    this.activatedRoute.parent?.paramMap.pipe(
      take(1),
      map((params: ParamMap) => {
        return `/kami-workforce/user/${Number(
          params.get('userId')
        )}/home/albums/${this.albumId}/photos/${photo.id}`;
      })
    );

  private subscribeToPhotos(): void {
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

  private subscribeToPhotoById(): void {
    this.activatedRoute.firstChild?.paramMap
      .pipe(
        take(1),
        switchMap((params: ParamMap) => {
          const photoIdFromRoute = Number(params.get('photoId'));
          if (photoIdFromRoute) {
            return this.photoService.getPhotoById(photoIdFromRoute);
          }
          return EMPTY;
        })
      )
      .subscribe((photo: Photo) => {
        this.photo = photo;
      });
  }
}
