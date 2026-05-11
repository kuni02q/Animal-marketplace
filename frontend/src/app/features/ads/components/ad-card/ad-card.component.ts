import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Input() showActions = false;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();


  getPrimaryImage(ad: AnimalAd): string | null {
    if (!ad?.images?.length) return null;

    const primary = ad.images.find(img => img.isPrimary);
    const url=primary?.url || ad.images[0]?.url;
    return url ? environment.apiUrl + url : null;
  }

  onEdit(event: MouseEvent){
    event.stopPropagation();
    this.edit.emit(this.ad.id);
  }

  onDelete(event: MouseEvent){
    event.stopPropagation();
    this.delete.emit(this.ad.id);
  }

}
