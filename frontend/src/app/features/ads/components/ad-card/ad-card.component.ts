import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimalAd} from '../../models/animal-ad.model';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.css',
})
export class AdCardComponent {

  @Input() ad!: AnimalAd;

}
