import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {AdsService} from '../../services/ads.service';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {AdFilter} from '../../models/ad-filter.model';
import {AdFilterComponent} from '../../components/ad-filter/ad-filter.component';
import {AdSortComponent} from '../../components/ad-sort/ad-sort.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private adsService: AdsService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.page = params['page'] ? +params['page'] : 0;

      this.selectedSort = params['sort'] || 'createdAt,desc';

      this.filter = {
        categoryId: params['categoryId'] ? +params['categoryId'] : null,
        country: params['country'] || '',
        city: params['city'] || '',
        minPrice: params['minPrice'] ? +params['minPrice'] : null,
        maxPrice: params['maxPrice'] ? +params['maxPrice'] : null,
        gender: params['gender'] || null,
        vaccinated: params['vaccinated'] === 'true' ? true : params['vaccinated'] === 'false' ? false : null,
        chipped: params['chipped'] === 'true' ? true : params['chipped'] === 'false' ? false : null,
        neutered: params['neutered'] === 'true' ? true : params['neutered'] === 'false' ? false : null,
        searchText: params['searchText'] || ''
      };


      this.load();
    });
  }

  load() {
    this.loading = true;

    this.adsService.getAll(this.filter, this.page, this.size, this.selectedSort)
      .subscribe(res => {
        this.ads = res.content;
        this.totalPages = res.totalPages;
        this.totalElements = res.totalElements;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  goToPage(p: number) {
    this.updateUrl({page: p});
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.updateUrl({page: this.page + 1});
    }
  }

  prev() {
    if (this.page > 0) {
      this.updateUrl({page: this.page - 1});
    }
  }

  onFilterChange(filter: AdFilter) {
    this.updateUrl({...filter, page: 0});
  }

  onSortChange(sort: string) {

    this.updateUrl({sort, page: 0})

  }


  updateUrl(extraParams: any = {}) {

    const queryParams: any = {
      page: this.page,
      sort: this.selectedSort,
      ...this.filter,
      ...extraParams
    };

    Object.keys(queryParams).forEach(key => {
      if (
        queryParams[key] === null ||
        queryParams[key] === '' ||
        queryParams[key] === undefined
      ) {
        delete queryParams[key];
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {...queryParams}
    });
  }


}
