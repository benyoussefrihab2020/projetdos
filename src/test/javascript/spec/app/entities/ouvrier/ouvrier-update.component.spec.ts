import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionmagasinTestModule } from '../../../test.module';
import { OuvrierUpdateComponent } from 'app/entities/ouvrier/ouvrier-update.component';
import { OuvrierService } from 'app/entities/ouvrier/ouvrier.service';
import { Ouvrier } from 'app/shared/model/ouvrier.model';

describe('Component Tests', () => {
  describe('Ouvrier Management Update Component', () => {
    let comp: OuvrierUpdateComponent;
    let fixture: ComponentFixture<OuvrierUpdateComponent>;
    let service: OuvrierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [OuvrierUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OuvrierUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OuvrierUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OuvrierService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ouvrier(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ouvrier();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
