import {Routes} from "@angular/router";
import {ClientesComponent} from "./containers/clientes/clientes.component";
import {ClientesFormComponent} from "./containers/clientes-form/clientes-form.component";
import {ClienteResolver} from "./resolver/cliente.resolver";

export const CLIENTES_ROUTES: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'new', component: ClientesFormComponent, resolve: {cliente: ClienteResolver}},
  {path: 'edit/:id', component: ClientesFormComponent, resolve: {cliente: ClienteResolver}}
];
