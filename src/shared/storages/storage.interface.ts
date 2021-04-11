export interface IStorage<T> {
  add(key: string, value: T): T;
  delete(key: string): void;
  findAll(): T[];
  find(key: string): T;
}
