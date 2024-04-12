import {Routes} from "@angular/router";
import {UsuariosComponent} from "./containers/usuarios/usuarios.component";
import {UsuariosFormComponent} from "./containers/usuarios-form/usuarios-form.component";
import {UsuarioResolver} from "./resolver/usuario.resolver";

export const USUARIOS_ROUTES: Routes = [
  {path: '', component: UsuariosComponent},
  {path: 'new', component: UsuariosFormComponent, resolve: {usuario: UsuarioResolver}},
  {path: 'edit/:id', component: UsuariosFormComponent, resolve: {usuario: UsuarioResolver}}
];
