import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnimalAd} from '../models/animal-ad.model';
import {ApiService} from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdsService {

  private api = "/api/ads"

  constructor(private apiService: ApiService) { }

  getAll(): Observable<AnimalAd[]>{
    return this.apiService.get<AnimalAd[]>(this.api);
  }

  getById(id: number): Observable<AnimalAd>{
    return this.apiService.get<AnimalAd>(`${this.api}/${id}`);
  }

  getMyAds(): Observable<AnimalAd[]>{
    return this.apiService.get<AnimalAd[]>(`${this.api}/my`);
  }


  createAd(formData: FormData){
    return this.apiService.post<AnimalAd>(`${this.api}`, formData);
  }

  deleteAd(id: number){
    return this.apiService.delete(`${this.api}/${id}`);
  }

  updateAd(id: number, formData: FormData){
    return this.apiService.put<AnimalAd>(`${this.api}/${id}`, formData);
  }




}
