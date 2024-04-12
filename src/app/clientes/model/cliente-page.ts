import {Cliente} from "./cliente";

export interface ClientePage {
  content: Cliente[];
  totalElements: number;
  totalPages: number;
}
