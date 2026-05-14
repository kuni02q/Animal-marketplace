import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {AnimalAd} from '../../models/animal-ad.model';
import {FavoritesService} from '../../services/favorites.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {

  ads: AnimalAd[] = [];

  loading = true;

  constructor(private favoritesService: FavoritesService, private cdr: ChangeDetectorRef, private router: Router) {}


  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(){
    this.loading = true;

    this.favoritesService.getFavorites().subscribe({
      next: data => {
        this.ads = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  removeFavorite(adId: number) {

    this.favoritesService.toggleFavorite(adId).subscribe({

      next: ()=>{
        this.ads = this.ads.filter(ad => ad.id !== adId);
        this.cdr.markForCheck();
      },
      error: err => {console.error(err)}

    })

  }





}
