import { IMagasin } from 'app/shared/model/magasin.model';

export interface IProduit {
  id?: number;
  nom?: string;
  prix?: number;
  magasin?: IMagasin;
}

export class Produit implements IProduit {
  constructor(public id?: number, public nom?: string, public prix?: number, public magasin?: IMagasin) {}
}
