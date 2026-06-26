import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnimalAd} from '../models/animal-ad.model';
import {ApiService} from '../../../core/services/api.service';
import {AdFilter} from '../models/ad-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {

  private api = "/api/ads"

  constructor(private apiService: ApiService) {
  }

  getAll(filter?: AdFilter): Observable<AnimalAd[]> {

    let params = new HttpParams();

    if (filter) {

      if (filter.categoryId != null)
        params = params.set('categoryId', filter.categoryId);

      if (filter.city)
        params = params.set('city', filter.city);

      if (filter.country)
        params = params.set('country', filter.country);

      if (filter.minPrice != null)
        params = params.set('minPrice', filter.minPrice);

      if (filter.maxPrice != null)
        params = params.set('maxPrice', filter.maxPrice);

      if (filter.gender)
        params = params.set('gender', filter.gender);

      if (filter.vaccinated != null)
        params = params.set('vaccinated', filter.vaccinated);

      if (filter.chipped != null)
        params = params.set('chipped', filter.chipped);

      if (filter.neutered != null)
        params = params.set('neutered', filter.neutered);

      if (filter.searchText)
        params = params.set('searchText', filter.searchText);

    }

    return this.apiService.get<AnimalAd[]>(this.api, {params});
  }

  getById(id: number): Observable<AnimalAd> {
    return this.apiService.get<AnimalAd>(`${this.api}/${id}`);
  }

  getMyAds(): Observable<AnimalAd[]> {
    return this.apiService.get<AnimalAd[]>(`${this.api}/my`);
  }


  createAd(formData: FormData) {
    return this.apiService.post<AnimalAd>(`${this.api}`, formData);
  }

  deleteAd(id: number) {
    return this.apiService.delete(`${this.api}/${id}`);
  }

  updateAd(id: number, formData: FormData) {
    return this.apiService.put<AnimalAd>(`${this.api}/${id}`, formData);
  }


}
