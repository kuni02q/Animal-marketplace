import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnimalAd} from '../models/animal-ad.model';

@Injectable({
  providedIn: 'root',
})
export class AdsService {

  private api = "/api/ads"

  constructor(private http: HttpClient) { }

  getAll(): Observable<AnimalAd[]>{
    return this.http.get<AnimalAd[]>(this.api);
  }

  getById(id: number): Observable<AnimalAd>{
    return this.http.get<AnimalAd>(`${this.api}/${id}`);
  }

}
