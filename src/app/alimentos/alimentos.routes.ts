import { Routes } from "@angular/router";

import { AlimentosComponent } from "./containers/alimentos/alimentos.component";
import { AlimentosFormComponent } from "./containers/alimentos-form/alimentos-form.component";
import { AlimentoResolver } from "./guards/alimento.resolver";

export const ALIMENTOS_ROUTES: Routes = [
  { path: '', component: AlimentosComponent },
  { path: 'new', component: AlimentosFormComponent, resolve: { alimento: AlimentoResolver }},
  { path: 'edit/:id', component: AlimentosFormComponent, resolve: { alimento: AlimentoResolver } }
  ];
