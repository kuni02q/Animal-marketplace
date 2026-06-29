import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {AdsService} from '../../services/ads.service';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {AdFilter} from '../../models/ad-filter.model';
import {AdFilterComponent} from '../../components/ad-filter/ad-filter.component';
import {AdSortComponent} from '../../components/ad-sort/ad-sort.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [CommonModule, AdCardComponent, AdFilterComponent, AdSortComponent, FormsModule],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css',
})
export class AdsListComponent implements OnInit {

  ads: AnimalAd[] = [];

  page = 0;
  size = 12;

  totalPages = 0;
  totalElements = 0;

  loading = true;

  selectedSort = 'createdAt,desc';

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
    this.load();
  }

  load() {
    this.loading = true;

    this.adsService.getAll(this.filter, this.page, this.size, this.selectedSort)
      .subscribe( res => {
        this.ads = res.content;
        this.totalPages=res.totalPages;
        this.totalElements=res.totalElements;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  goToPage(p: number) {
    this.page = p;
    this.load();
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }

  onFilterChange(filter: AdFilter) {
    this.filter = filter;

    this.page = 0;

    this.load();
  }

  onSortChange(sort: string) {
    this.selectedSort = sort;
    this.page = 0;
    this.load();
  }



}
