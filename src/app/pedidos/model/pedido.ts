export interface Pedido {
  id: number;
  usuario: number;
  cliente: number;
  dataHora: string;
  valorTotal: number;
  itens: Array<any>;
}
