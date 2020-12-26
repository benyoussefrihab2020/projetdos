import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionmagasinSharedModule } from 'app/shared/shared.module';
import { OuvrierComponent } from './ouvrier.component';
import { OuvrierDetailComponent } from './ouvrier-detail.component';
import { OuvrierUpdateComponent } from './ouvrier-update.component';
import { OuvrierDeleteDialogComponent } from './ouvrier-delete-dialog.component';
import { ouvrierRoute } from './ouvrier.route';

@NgModule({
  imports: [GestionmagasinSharedModule, RouterModule.forChild(ouvrierRoute)],
  declarations: [OuvrierComponent, OuvrierDetailComponent, OuvrierUpdateComponent, OuvrierDeleteDialogComponent],
  entryComponents: [OuvrierDeleteDialogComponent],
})
export class GestionmagasinOuvrierModule {}
