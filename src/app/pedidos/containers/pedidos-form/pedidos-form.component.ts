import {Component, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {PedidosService} from "../../service/pedidos.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {Location, NgForOf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-pedidos-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOption,
    MatCardContent,
    MatToolbar,
    MatCard,
    MatFormField,
    MatSelect,
    MatCardActions,
    MatButton,
    MatInput,
    MatIcon,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './pedidos-form.component.html',
  styleUrl: './pedidos-form.component.scss'
})
export class PedidosFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: PedidosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const pedido: Pedido = this.route.snapshot.data['pedido'];
    this.form = this.formBuilder.group({
      id: [pedido.id],
      usuario: [pedido.usuario, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      cliente: [pedido.cliente, [Validators.required]],
      valorTotal: [pedido.valorTotal, [Validators.required]],
      itens: this.formBuilder.array(this.retrievePedido(pedido))
    });
  }

  private retrievePedido(pedido: Pedido) {
    let Itens = [];
    if (pedido?.itens) {
      pedido.itens.forEach(iten => Itens.push(this.createItem(iten)));
    } else {
      Itens.push(this.createItem())
    }
    return Itens;
  }

  private createItem(Item = {quantidade: 0, alimento: 0, valorUnitario: 0}) {
    return this.formBuilder.group({
      quantidade: [Item.quantidade],
      alimento: [Item.alimento],
      valorUnitario: [Item.valorUnitario]
    })
  }

  addNewItem() {
    let items = this.form.get('itens') as UntypedFormArray;
    items.push(this.createItem())
  }

  removeItem(index: number) {
    let items = this.form.get('itens') as UntypedFormArray;
    items.removeAt(index)
  }

  getItemFormArray() {
    return (<UntypedFormArray>this.form.get("itens")).controls;
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess('Pedido salvo com sucesso!'), error => this.onError('Erro ao salvar pedidol.'));
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(mensagem: string) {
    this.snackBar.open(mensagem, '', {duration: 5000});
    this.onCancel();
  }

  private onError(mensagem: string) {
    this.snackBar.open(mensagem, '', {duration: 5000});
  }
}
