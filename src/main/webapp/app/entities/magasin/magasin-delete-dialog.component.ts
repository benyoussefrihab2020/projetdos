import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMagasin } from 'app/shared/model/magasin.model';
import { MagasinService } from './magasin.service';

@Component({
  templateUrl: './magasin-delete-dialog.component.html',
})
export class MagasinDeleteDialogComponent {
  magasin?: IMagasin;

  constructor(protected magasinService: MagasinService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.magasinService.delete(id).subscribe(() => {
      this.eventManager.broadcast('magasinListModification');
      this.activeModal.close();
    });
  }
}
