import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {AnimalAd} from '../../models/animal-ad.model';
import {AdsService} from '../../services/ads.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-ads',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './my-ads.component.html',
  styleUrl: './my-ads.component.css',
})
export class MyAdsComponent implements OnInit {

  ads: AnimalAd[] = [];
  loading = true;

  showDeleteModal = false;
  selectedDeleteId: number | null = null;

  constructor(private adsService: AdsService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds() {
    this.loading = true;

    this.adsService.getMyAds().subscribe({
      next: data => {
        this.ads = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  onEditAd(id: number) {
    this.router.navigate(['/edit-ad', id]);
  }

  onCreate() {
    this.router.navigate(['/create-ad']);
  }


  openDeleteModal(id: number) {
    this.selectedDeleteId = id;
    this.showDeleteModal = true;
  }


  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedDeleteId = null;
  }


  confirmDelete() {
    if (!this.selectedDeleteId) return;

    this.adsService.deleteAd(this.selectedDeleteId).subscribe({
      next: () => {

        this.ads = this.ads.filter(
          ad => ad.id !== this.selectedDeleteId
        );

        this.closeDeleteModal();
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error(err);
        this.closeDeleteModal();
      }
    });
  }


}
