import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionmagasinTestModule } from '../../../test.module';
import { OuvrierDetailComponent } from 'app/entities/ouvrier/ouvrier-detail.component';
import { Ouvrier } from 'app/shared/model/ouvrier.model';

describe('Component Tests', () => {
  describe('Ouvrier Management Detail Component', () => {
    let comp: OuvrierDetailComponent;
    let fixture: ComponentFixture<OuvrierDetailComponent>;
    const route = ({ data: of({ ouvrier: new Ouvrier(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [OuvrierDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OuvrierDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OuvrierDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ouvrier on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ouvrier).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
