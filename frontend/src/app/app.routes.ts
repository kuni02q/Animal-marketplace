import { Routes } from '@angular/router';
import {AuthComponent} from './features/auth/auth.component';
import {AdsListComponent} from './features/ads/pages/ads-list/ads-list.component';

export const routes: Routes = [
  { path: '', component: AdsListComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'ads/:id', loadComponent: () =>
      import('./features/ads/pages/ad-details/ad-details.component').then(m => m.AdDetailsComponent),
  },
];
