import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOuvrier } from 'app/shared/model/ouvrier.model';
import { OuvrierService } from './ouvrier.service';
import { OuvrierDeleteDialogComponent } from './ouvrier-delete-dialog.component';

@Component({
  selector: 'jhi-ouvrier',
  templateUrl: './ouvrier.component.html',
})
export class OuvrierComponent implements OnInit, OnDestroy {
  ouvriers?: IOuvrier[];
  eventSubscriber?: Subscription;

  constructor(protected ouvrierService: OuvrierService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ouvrierService.query().subscribe((res: HttpResponse<IOuvrier[]>) => (this.ouvriers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOuvriers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOuvrier): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOuvriers(): void {
    this.eventSubscriber = this.eventManager.subscribe('ouvrierListModification', () => this.loadAll());
  }

  delete(ouvrier: IOuvrier): void {
    const modalRef = this.modalService.open(OuvrierDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ouvrier = ouvrier;
  }
}
