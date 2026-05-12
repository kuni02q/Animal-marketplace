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
    console.log("edit", id);
  }

  deleteAd(id: number) {

    const confirmed = confirm("Biztosan törlöd a hirdetést?");

    if (!confirmed) return;

    this.adsService.deleteAd(id).subscribe({
      next: () => {
        this.ads = this.ads.filter(ad => ad.id !== id);
        this.cdr.markForCheck();
      },
      error: (err) => {console.error(err)}
    })

  }

  onCreate() {
    this.router.navigate(['/create-ad']);
  }


}
