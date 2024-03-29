import type IStorageClient from './storage.client.interface';
import type { DefaultOptions, GetOptions, GetOptionsWithDefaultValue, SetOptions } from './storage.client.interface';

export default class IndexedDBClient implements IStorageClient {
  public constructor(private readonly name: string) {}

  public async clear() {
    const db = await this.getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.clear();

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  public async deleteItem({ key }: DefaultOptions) {
    const db = await this.getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.delete(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  public getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  public getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  public async getItem<T>({
    defaultValue,
    deserialize = (val) => val,
    key,
  }: GetOptions<T> | GetOptionsWithDefaultValue<T>): Promise<T | undefined> {
    const db = await this.getDb();

    return new Promise<T | undefined>((resolve, reject) => {
      const transaction = db.transaction(this.name, 'readonly');

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
      transaction.commit();
    });
  }

  public async has({ key }: DefaultOptions) {
    const db = await this.getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(this.name, 'readonly');

      const store = transaction.objectStore(this.name);

      const request = store.getKey(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  public setItem<T>(options: SetOptions<T>): Promise<boolean>;

  public async setItem<T>({ key, serialize = (val) => val, value }: SetOptions<T>) {
    const db = await this.getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(this.name, 'readwrite');

      const store = transaction.objectStore(this.name);

      const request = store.put(serialize(value), key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }
  private async getDb() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.name);

      request.onupgradeneeded = () => {
        const db = request.result;

        db.onerror = () => {
          reject(new Error('Failed to create object store'));
        };

        if (!db.objectStoreNames.contains(this.name)) {
          db.createObjectStore(this.name);
        }
        resolve(db);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = request.onblocked = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }
}
