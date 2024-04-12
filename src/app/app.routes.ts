import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'alimento',
    loadChildren: () => import('./alimentos/alimentos.routes').then(m => m.ALIMENTOS_ROUTES)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./clientes/clientes.routes').then(m => m.CLIENTES_ROUTES)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedidos/pedidos.routes').then(m => m.PEDIDOS_ROUTES)
  }
];
