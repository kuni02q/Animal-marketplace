import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AnimalAd} from '../../models/animal-ad.model';
import {ActivatedRoute} from '@angular/router';
import {AdsService} from '../../services/ads.service';
import {CommonModule} from '@angular/common';
import {switchMap} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-ad-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-details.component.html',
  styleUrl: './ad-details.component.css',
})
export class AdDetailsComponent implements OnInit {
  ad: AnimalAd | null = null;

  constructor(private route: ActivatedRoute, private adsService: AdsService, private cdr: ChangeDetectorRef) { }

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
        },
        error: (err) => console.error(err),
      });

  }


  getImageUrl(url: string): string{
    return environment.apiUrl + url;
  }

}
