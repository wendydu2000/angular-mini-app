import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlickrService } from "../../services/flickr.service";
import { flowerPhoto } from "../../models/flower-photo.model";
import { catchError, finalize, throwError } from "rxjs";

@Component({
  selector: 'app-flower-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flower-list.template.html',
  styleUrls: ['./flower-list.style.scss']
})
export class FlowerListComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public error: string | null = null;
  public totalPhotosNumber: number = 0;
  public flowersPhotos: flowerPhoto[] = [];
  public currentColor?: number;
  public page: number = 1;

  constructor(private cdr: ChangeDetectorRef, private flickrService: FlickrService) { }

  /**
   *fetch initial flower photos on component initialization
   */
  ngOnInit(): void {
    this.fetchFlowers();
  }

  ngOnDestroy(): void {
    // TODO: Cleanup
  }

  /**
   * Fetch flower photos from Flickr API
   */
  private fetchFlowers(): void {
    this.isLoading = true;
    this.error = null;

    this.flickrService.getFlowers(this.page, this.currentColor).pipe(
      catchError(err => {
        this.error = 'Failed to load flower photos.';
        this.isLoading = false;
        this.flowersPhotos = [];
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    ).subscribe(response => {
      const mappedPhotos = response.photos.photo.map((photo: flowerPhoto) => ({
        ...photo,
        url: this.getPhotoUrl(photo)
      }));
      this.totalPhotosNumber = response.photos.total;
      this.flowersPhotos = [...this.flowersPhotos, ...mappedPhotos];
    });
  }

  /**
   * get photo URL from photo data
   * @param photo 
   * @returns 
   */
  private getPhotoUrl(photo: flowerPhoto): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }

  /**
   * fetch flowers by selected color
   * @param colorCode 
   */
  public fetchFlowersByColor(colorCode?: number): void {
    this.currentColor = colorCode;
    this.page = 1;
    this.flowersPhotos = [];
    this.fetchFlowers();
  }

  /**
   * load more flower photos
   */
  public loadMoreFlowers(): void {
    this.page++;
    this.isLoading = true;
    this.error = null;

    this.flickrService.getFlowers(this.page, this.currentColor).pipe(
      catchError(err => {
        this.error = 'Failed to load flower photos.';
        this.isLoading = false;
        this.flowersPhotos = [];
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    ).subscribe(res => {
      const mapped: flowerPhoto[] = res.photos.photo.map((photo: any) => ({
        id: photo.id,
        farm: photo.farm,
        server: photo.server,
        secret: photo.secret,
        url: this.getPhotoUrl(photo)
      }));

      this.flowersPhotos = [...this.flowersPhotos, ...mapped];
      this.isLoading = false;
    });
  }
}
