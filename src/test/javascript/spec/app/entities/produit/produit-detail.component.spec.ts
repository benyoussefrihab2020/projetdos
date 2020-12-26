import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionmagasinTestModule } from '../../../test.module';
import { ProduitDetailComponent } from 'app/entities/produit/produit-detail.component';
import { Produit } from 'app/shared/model/produit.model';

describe('Component Tests', () => {
  describe('Produit Management Detail Component', () => {
    let comp: ProduitDetailComponent;
    let fixture: ComponentFixture<ProduitDetailComponent>;
    const route = ({ data: of({ produit: new Produit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [ProduitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProduitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
