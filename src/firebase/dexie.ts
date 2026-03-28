import Dexie, { Table } from 'dexie';

export interface Fruit {
  id?: number;
  name: string;
  color: string;
}

export class FruitDB extends Dexie {
  fruits!: Table<Fruit>;

  constructor() {
    super('FruitDatabase');
    this.version(1).stores({
      fruits: '++id'
    });
  }
}

export const db = new FruitDB();
