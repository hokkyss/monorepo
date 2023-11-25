import { injectable, singleton } from 'tsyringe';

import StorageClient from '../../abstract/storage/storage.client';

@injectable()
@singleton()
export default class IndexedDBClient extends StorageClient {
  private db: IDBDatabase;

  public constructor(private readonly name: string) {
    super();

    this.db = indexedDB.open(name).result.createObjectStore(name).transaction.db;
  }

  public override async clear() {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = this.db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.clear();

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }

  public override async deleteItem(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = this.db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.delete(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }

  public override getItem<T>(key: string, deserialize?: (value: string) => T): Promise<T | undefined>;
  public override getItem<T>(key: string, deserialize: (value: string) => T, defaultValue: T): Promise<T>;
  public override async getItem<T>(key: string, deserialize: (value: string) => T = JSON.parse, defaultValue?: T) {
    return new Promise<T | undefined>((resolve, reject) => {
      const transaction = this.db.transaction(this.name, 'readonly');

      const store = transaction.objectStore(this.name);

      const request = store.get(key);

      transaction.oncomplete = () => {
        if (typeof request.result === 'undefined') {
          return resolve(defaultValue);
        }
        resolve(deserialize(request.result));
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }

  public override async has(key: string) {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = this.db.transaction(this.name, 'readonly');

      const store = transaction.objectStore(this.name);

      const request = store.getKey(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }

  public override async setItem<T>(key: string, value: T, serialize: (value: T) => string = JSON.stringify) {
    return new Promise<boolean>((resolve, reject) => {
      const transaction = this.db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.put(serialize(value), key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }
}
