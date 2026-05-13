import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {AdsService} from '../../services/ads.service';
import {CategoryService} from '../../../../core/services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {AllImage} from '../../models/all-image.model';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent implements OnInit {

  title = "";
  description = "";
  price: number | null = null;
  location = "";
  categoryId: number | null = null;

  categories: any[] = [];

  images: AllImage[] = []
  imagesToDelete: number[] = [];

  loading = false;

  isEditMode = false;
  adId: number | null = null;

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  constructor(private adsService: AdsService, private categoryService: CategoryService,
              private router: Router, private cdr: ChangeDetectorRef,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.adId = Number(id);

      this.loadAd(this.adId)
    }

  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer?.files) return;

    const dropped: AllImage[] = Array.from(event.dataTransfer.files).map(file => ({
      type: 'new',
      file,
      preview: URL.createObjectURL(file),
      key: crypto.randomUUID()
    }));

    this.images = [...this.images, ...dropped];

  }

  onFileSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    const newImages: AllImage[] = Array.from(input.files).map(file => ({
      type: 'new',
      file,
      preview: URL.createObjectURL(file),
      key: crypto.randomUUID()
    }));

    this.images = [...this.images, ...newImages];

  }


  removeImage(image: AllImage) {

    if (image.type === 'existing') {
      this.imagesToDelete.push(image.id);
    }

    if (image.type === 'new') {
      URL.revokeObjectURL(image.preview);
    }

    this.images = this.images.filter(i => i.key !== image.key);
  }


  createAd() {

    if (!this.title || !this.price || !this.location || !this.categoryId) {
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('location', this.location);
    formData.append('categoryId', this.categoryId.toString());

    for (const img of this.images) {
      if(img.type === 'new') {
        formData.append('images', img.file);
      }
    }

    for (const id of this.imagesToDelete) {
      formData.append('deleteImageIds', id.toString());
    }

    const request = this.isEditMode && this.adId
      ? this.adsService.updateAd(this.adId!, formData)
      : this.adsService.createAd(formData);

    request.subscribe({
      next: (ad) => {
        this.router.navigate(['/ads', ad.id]);
      },
      error: (err) => {
        console.error(err)
        this.loading = false;
      }
    });
  }

  loadAd(id: number) {

    this.adsService.getById(id).subscribe({
      next: (ad) => {
        this.title = ad.title;
        this.description = ad.description;
        this.price = ad.price;
        this.location = ad.location;
        this.categoryId = ad.categoryId;

        const existing: AllImage[] = ad.images.map(img => ({
          type: 'existing',
          id: img.id,
          url: environment.apiUrl + img.url,
          key: crypto.randomUUID()
        }));

        this.images = existing;
      }
    });
  }


}
