import {Alimento} from "./alimento";

export interface AlimentoPage {
  content: Alimento[];
  totalElements: number;
  totalPages: number;
}
