import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.GestionmagasinProduitModule),
      },
      {
        path: 'magasin',
        loadChildren: () => import('./magasin/magasin.module').then(m => m.GestionmagasinMagasinModule),
      },
      {
        path: 'ouvrier',
        loadChildren: () => import('./ouvrier/ouvrier.module').then(m => m.GestionmagasinOuvrierModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GestionmagasinEntityModule {}
