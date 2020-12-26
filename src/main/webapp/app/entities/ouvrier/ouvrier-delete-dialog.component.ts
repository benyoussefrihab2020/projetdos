import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { OuvrierService } from './ouvrier.service';

@Component({
  templateUrl: './ouvrier-delete-dialog.component.html',
})
export class OuvrierDeleteDialogComponent {
  ouvrier?: IOuvrier;

  constructor(protected ouvrierService: OuvrierService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ouvrierService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ouvrierListModification');
      this.activeModal.close();
    });
  }
}
