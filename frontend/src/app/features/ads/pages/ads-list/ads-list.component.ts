import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {AdsService} from '../../services/ads.service';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {AdFilter} from '../../models/ad-filter.model';
import {AdFilterComponent} from '../../components/ad-filter/ad-filter.component';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [CommonModule, AdCardComponent, AdFilterComponent],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css',
})
export class AdsListComponent implements OnInit {

  ads: AnimalAd[] = [];
  loading = true;

  filter: AdFilter = {
    categoryId: null,
    country: '',
    city: '',
    minPrice: null,
    maxPrice: null,
    gender: null,

    vaccinated: null,
    chipped: null,
    neutered: null,

    searchText: ''
  };

  constructor(private adsService: AdsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAds();
  }

  loadAds() {
    this.loading = true;

    this.adsService.getAll(this.filter).subscribe({
      next: (data) => {
        this.ads = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  onFilterChange(filter: AdFilter) {
    this.filter = filter;
    this.loadAds();
  }



}
