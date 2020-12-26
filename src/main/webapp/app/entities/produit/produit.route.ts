import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduit, Produit } from 'app/shared/model/produit.model';
import { ProduitService } from './produit.service';
import { ProduitComponent } from './produit.component';
import { ProduitDetailComponent } from './produit-detail.component';
import { ProduitUpdateComponent } from './produit-update.component';

@Injectable({ providedIn: 'root' })
export class ProduitResolve implements Resolve<IProduit> {
  constructor(private service: ProduitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((produit: HttpResponse<Produit>) => {
          if (produit.body) {
            return of(produit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Produit());
  }
}

export const produitRoute: Routes = [
  {
    path: '',
    component: ProduitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduitDetailComponent,
    resolve: {
      produit: ProduitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduitUpdateComponent,
    resolve: {
      produit: ProduitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produits',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduitUpdateComponent,
    resolve: {
      produit: ProduitResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Produits',
    },
    canActivate: [UserRouteAccessService],
  },
];
