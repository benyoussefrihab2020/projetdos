import { IMagasin } from 'app/shared/model/magasin.model';

export interface IOuvrier {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: string;
  salaire?: number;
  magasin?: IMagasin;
}

export class Ouvrier implements IOuvrier {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public adresse?: string,
    public salaire?: number,
    public magasin?: IMagasin
  ) {}
}
