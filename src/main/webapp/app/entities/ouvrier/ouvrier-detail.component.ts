import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOuvrier } from 'app/shared/model/ouvrier.model';

@Component({
  selector: 'jhi-ouvrier-detail',
  templateUrl: './ouvrier-detail.component.html',
})
export class OuvrierDetailComponent implements OnInit {
  ouvrier: IOuvrier | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ouvrier }) => (this.ouvrier = ouvrier));
  }

  previousState(): void {
    window.history.back();
  }
}
