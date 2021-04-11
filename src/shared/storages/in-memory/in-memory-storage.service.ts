import { IStorage } from '../storage.interface';

export class InMemoryStorage<T> implements IStorage<T> {
  private globalStorage = new Map<string, Record<string, T>>();
  private storage: Record<string, T>;
  modelName = '';

  createStore() {
    this.storage = {};
    this.globalStorage.set(this.modelName, this.storage);
  }

  add(key: string, value: T): T {
    this.storage[key] = value;
    return value;
  }

  delete(key: string): void {
    delete this.storage[key];
  }

  find(key: string): T {
    return this.storage[key];
  }

  findAll(): T[] {
    const values = Object.values(this.storage);

    return values;
  }
}
