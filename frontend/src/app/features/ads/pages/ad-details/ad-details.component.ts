import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AnimalAd} from '../../models/animal-ad.model';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../services/ads.service';
import {CommonModule} from '@angular/common';
import {switchMap} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {FavoritesService} from '../../services/favorites.service';

@Component({
  selector: 'app-ad-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-details.component.html',
  styleUrl: './ad-details.component.css',
})
export class AdDetailsComponent implements OnInit {
  ad: AnimalAd | null = null;

  isFav = false;

  constructor(private route: ActivatedRoute, private adsService: AdsService,
              private cdr: ChangeDetectorRef, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.adsService.getById(id)
      })
    )
      .subscribe({
        next: (data) =>{
          this.ad = data;

          this.cdr.markForCheck();

          this.checkFavorite();
        },
        error: (err) => console.error(err),
      });

  }


  getImageUrl(url: string): string{
    return environment.apiUrl + url;
  }

  toggleFavorites(){

    if (!this.ad) return;

    this.favoritesService.toggleFavorite(this.ad.id).subscribe({
      next: (res) => {
        this.isFav = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

  }

  checkFavorite() {
    if (!this.ad) return;

    this.favoritesService.isFavorite(this.ad.id).subscribe({
      next: res => {
        this.isFav = res;
        this.cdr.markForCheck();
      },
      error: err => console.error(err)
    });
  }


}
