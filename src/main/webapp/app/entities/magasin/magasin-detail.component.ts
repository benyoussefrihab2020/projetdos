import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMagasin } from 'app/shared/model/magasin.model';

@Component({
  selector: 'jhi-magasin-detail',
  templateUrl: './magasin-detail.component.html',
})
export class MagasinDetailComponent implements OnInit {
  magasin: IMagasin | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ magasin }) => (this.magasin = magasin));
  }

  previousState(): void {
    window.history.back();
  }
}
