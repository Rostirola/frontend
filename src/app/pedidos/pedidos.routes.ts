import {Routes} from "@angular/router";
import {PedidoResolver} from "./resolver/pedido.resolver";
import {PedidosComponent} from "./containers/pedidos/pedidos.component";
import {PedidosFormComponent} from "./containers/pedidos-form/pedidos-form.component";

export const PEDIDOS_ROUTES: Routes = [
  {path: '', component: PedidosComponent},
  {path: 'new', component: PedidosFormComponent, resolve: {pedido: PedidoResolver}},
  {path: 'edit/:id', component: PedidosFormComponent, resolve: {pedido: PedidoResolver}}
];
