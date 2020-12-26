import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GestionmagasinTestModule } from '../../../test.module';
import { MagasinUpdateComponent } from 'app/entities/magasin/magasin-update.component';
import { MagasinService } from 'app/entities/magasin/magasin.service';
import { Magasin } from 'app/shared/model/magasin.model';

describe('Component Tests', () => {
  describe('Magasin Management Update Component', () => {
    let comp: MagasinUpdateComponent;
    let fixture: ComponentFixture<MagasinUpdateComponent>;
    let service: MagasinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [MagasinUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MagasinUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagasinUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagasinService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Magasin(123);
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
        const entity = new Magasin();
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
