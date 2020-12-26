import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMagasin } from 'app/shared/model/magasin.model';
import { MagasinService } from './magasin.service';
import { MagasinDeleteDialogComponent } from './magasin-delete-dialog.component';

@Component({
  selector: 'jhi-magasin',
  templateUrl: './magasin.component.html',
})
export class MagasinComponent implements OnInit, OnDestroy {
  magasins?: IMagasin[];
  eventSubscriber?: Subscription;

  constructor(protected magasinService: MagasinService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.magasinService.query().subscribe((res: HttpResponse<IMagasin[]>) => (this.magasins = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMagasins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMagasin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMagasins(): void {
    this.eventSubscriber = this.eventManager.subscribe('magasinListModification', () => this.loadAll());
  }

  delete(magasin: IMagasin): void {
    const modalRef = this.modalService.open(MagasinDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.magasin = magasin;
  }
}
