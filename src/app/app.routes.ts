import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DailyTrackingComponent } from './daily-tracking/daily-tracking.component';
import { DailyMeComponent } from './daily-me/daily-me.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'daily-me',
    component: DailyMeComponent,
  },
  { path: 'daily-tracking', component: DailyTrackingComponent },
  { path: 'callback', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
