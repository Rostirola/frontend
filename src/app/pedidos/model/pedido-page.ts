import {Pedido} from "./pedido";

export interface PedidoPage {
  content: Pedido[];
  totalElements: number;
  totalPages: number;
}
