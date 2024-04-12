import {Component, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlimentosService} from "../../services/alimentos.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Alimento} from "../../model/alimento";
import {MatOption} from "@angular/material/autocomplete";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-alimentos-form',
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
    MatInputModule
  ],
  templateUrl: './alimentos-form.component.html',
  styleUrl: './alimentos-form.component.scss'
})
export class AlimentosFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: AlimentosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const alimento: Alimento = this.route.snapshot.data['alimento'];
    this.form = this.formBuilder.group({
      id: [alimento.id],
      tipo: [alimento.tipo, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      nome: [alimento.nome],
      valor: [alimento.valor, [Validators.required]]
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess('Alimento salvo com sucesso!'), error => this.onError('Erro ao salvar alimentol.'));
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
