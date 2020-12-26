import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionmagasinSharedModule } from 'app/shared/shared.module';
import { MagasinComponent } from './magasin.component';
import { MagasinDetailComponent } from './magasin-detail.component';
import { MagasinUpdateComponent } from './magasin-update.component';
import { MagasinDeleteDialogComponent } from './magasin-delete-dialog.component';
import { magasinRoute } from './magasin.route';

@NgModule({
  imports: [GestionmagasinSharedModule, RouterModule.forChild(magasinRoute)],
  declarations: [MagasinComponent, MagasinDetailComponent, MagasinUpdateComponent, MagasinDeleteDialogComponent],
  entryComponents: [MagasinDeleteDialogComponent],
})
export class GestionmagasinMagasinModule {}
