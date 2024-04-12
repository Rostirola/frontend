import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Pedido} from "../../model/pedido";
import moment from "moment";

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './pedidos-list.component.html',
  styleUrl: './pedidos-list.component.scss'
})
export class PedidosListComponent {
  @Input() pedidos: Pedido[] = []
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'usuario', 'cliente', 'dataHora', 'valorTotal', 'acoes'];

  constructor() {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(pedido: Pedido) {
    this.edit.emit(pedido);
  }

  onDelete(pedido: Pedido) {
    this.remove.emit(pedido);
  }

  protected readonly moment = moment;
}
