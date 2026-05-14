import { Injectable } from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {AnimalAd} from '../models/animal-ad.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private api= '/api/favorites';

  constructor(private apiService: ApiService) {}

  getFavorites(): Observable<AnimalAd[]>{
    return this.apiService.get<AnimalAd[]>(`${this.api}/my`);
  }

  toggleFavorite(adId: number) {
    return this.apiService.put<boolean>(`${this.api}/toggle/${adId}`, {});
  }


  isFavorite(adId: number) {
    return this.apiService.get<boolean>(`${this.api}/exists/${adId}`);
  }

}
