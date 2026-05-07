import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {AdsService} from '../../services/ads.service';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';

@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css',
})
export class AdsListComponent implements OnInit {

  ads: AnimalAd[]=[];

  constructor(private adsService: AdsService) {}

  ngOnInit() {
    this.loadAds();
  }

  loadAds() {
    this.adsService.getAll().subscribe({
      next: (data) => {
        this.ads = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }



}
