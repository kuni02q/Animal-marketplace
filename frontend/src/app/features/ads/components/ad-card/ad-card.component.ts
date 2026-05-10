import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {RouterLink} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.css',
})
export class AdCardComponent {

  @Input() ad!: AnimalAd;

  getPrimaryImage(ad: AnimalAd): string | null {
    if (!ad?.images?.length) return null;

    const primary = ad.images.find(img => img.isPrimary);
    const url=primary?.url || ad.images[0]?.url;
    return url ? environment.apiUrl + url : null;
  }

}
