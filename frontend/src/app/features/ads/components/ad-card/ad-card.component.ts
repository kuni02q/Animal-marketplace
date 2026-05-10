import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';
import {RouterLink} from '@angular/router';

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
    return primary?.url || ad.images[0]?.url || null;
  }

}
