import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {AnimalAd} from '../../features/ads/models/animal-ad.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private api = "/api/categories";

  constructor(private apiService: ApiService) {}

  getAll(){
    return this.apiService.get<any[]>(this.api);
  }


}
