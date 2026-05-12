import {Routes} from '@angular/router';
import {AuthComponent} from './features/auth/auth.component';
import {AdsListComponent} from './features/ads/pages/ads-list/ads-list.component';
import {MyAdsComponent} from './features/ads/pages/my-ads/my-ads.component';
import {AdDetailsComponent} from './features/ads/pages/ad-details/ad-details.component';
import {authGuard} from './core/guards/auth.guard';
import {CreateAdComponent} from './features/ads/pages/create-ad/create-ad.component';

export const routes: Routes = [
  {path: '', component: AdsListComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'ads/:id', component: AdDetailsComponent},
  {path: 'my-ads', component: MyAdsComponent, canActivate: [authGuard] },
  {path: 'create-ad', component: CreateAdComponent, canActivate: [authGuard] },
];
