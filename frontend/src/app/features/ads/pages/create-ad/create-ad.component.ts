import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {AdsService} from '../../services/ads.service';
import {CategoryService} from '../../../../core/services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {AllImage} from '../../models/all-image.model';
import {CategorySelectorComponent} from '../../components/category-selector/category-selector.component';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [CommonModule, FormsModule, CategorySelectorComponent],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent implements OnInit {

  title = "";
  description = "";
  price: number | null = null;
  categoryId: number | null = null;


  images: AllImage[] = []
  imagesToDelete: number[] = [];

  loading = false;

  isEditMode = false;
  adId: number | null = null;

  birthDate: string | null = null;

  weight: number | null = null;

  gender: 'MALE' | 'FEMALE' | 'UNKNOWN' | null = null;

  vaccinated = false;
  chipped = false;
  neutered = false;

  location = {
    country: '',
    city: ''
  };

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  constructor(private adsService: AdsService,
              private router: Router,
              private route: ActivatedRoute, private cd: ChangeDetectorRef,) {
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.adId = Number(id);

      this.loadAd(this.adId)
    }

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
    formData.append('location.city', this.location.city);
    formData.append('location.country', this.location.country);

    formData.append('weight', this.weight?.toString() ?? '');
    formData.append('birthDate', this.birthDate ?? '');
    formData.append('gender', this.gender ?? '');

    formData.append('vaccinated', String(this.vaccinated));
    formData.append('chipped', String(this.chipped));
    formData.append('neutered', String(this.neutered));

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

    console.log('LOAD AD CALLED, id:', id);

    this.adsService.getById(id).subscribe({
      next: (ad) => {
        console.log('AD RESPONSE:', ad);
        this.title = ad.title;
        this.description = ad.description;
        this.price = ad.price;

        this.location.country = ad.country ?? '';
        this.location.city = ad.city ?? '';

        this.categoryId = ad.categoryId;

        this.weight = ad.weight ?? null;
        this.birthDate = ad.birthDate ?? null;
        this.gender = ad.gender ?? null;

        this.vaccinated = ad.vaccinated ?? false;
        this.chipped = ad.chipped ?? false;
        this.neutered = ad.neutered ?? false;

        const existing: AllImage[] = ad.images.map(img => ({
          type: 'existing',
          id: img.id,
          url: environment.apiUrl + img.url,
          key: crypto.randomUUID()
        }));

        this.images = existing;

        this.cd.markForCheck();
      }
    });
  }


}
