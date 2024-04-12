import {Usuario} from "./usuario";

export interface UsuarioPage {
  content: Usuario[];
  totalElements: number;
  totalPages: number;
}
