import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'alimento'},
  {
    path: 'alimento',
    loadChildren: () => import('./alimentos/alimentos.routes').then(m => m.ALIMENTOS_ROUTES)
  }
];
