import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOuvrier, Ouvrier } from 'app/shared/model/ouvrier.model';
import { OuvrierService } from './ouvrier.service';
import { IMagasin } from 'app/shared/model/magasin.model';
import { MagasinService } from 'app/entities/magasin/magasin.service';

@Component({
  selector: 'jhi-ouvrier-update',
  templateUrl: './ouvrier-update.component.html',
})
export class OuvrierUpdateComponent implements OnInit {
  isSaving = false;
  magasins: IMagasin[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    adresse: [],
    salaire: [],
    magasin: [],
  });

  constructor(
    protected ouvrierService: OuvrierService,
    protected magasinService: MagasinService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ouvrier }) => {
      this.updateForm(ouvrier);

      this.magasinService.query().subscribe((res: HttpResponse<IMagasin[]>) => (this.magasins = res.body || []));
    });
  }

  updateForm(ouvrier: IOuvrier): void {
    this.editForm.patchValue({
      id: ouvrier.id,
      nom: ouvrier.nom,
      prenom: ouvrier.prenom,
      adresse: ouvrier.adresse,
      salaire: ouvrier.salaire,
      magasin: ouvrier.magasin,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ouvrier = this.createFromForm();
    if (ouvrier.id !== undefined) {
      this.subscribeToSaveResponse(this.ouvrierService.update(ouvrier));
    } else {
      this.subscribeToSaveResponse(this.ouvrierService.create(ouvrier));
    }
  }

  private createFromForm(): IOuvrier {
    return {
      ...new Ouvrier(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      salaire: this.editForm.get(['salaire'])!.value,
      magasin: this.editForm.get(['magasin'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOuvrier>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IMagasin): any {
    return item.id;
  }
}
