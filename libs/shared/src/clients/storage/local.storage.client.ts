import type IStorageClient from './storage.client.interface';
import type { DefaultOptions, GetOptions, GetOptionsWithDefaultValue, SetOptions } from './storage.client.interface';

export default class LocalStorageClient implements IStorageClient {
  public async clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  public async deleteItem({ key }: DefaultOptions) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  public getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  public getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  public async getItem<T>({
    defaultValue,
    deserialize = JSON.parse,
    key,
  }: GetOptions<T> | GetOptionsWithDefaultValue<T>): Promise<T | undefined> {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item);
  }

  public async has({ key }: DefaultOptions) {
    return localStorage.getItem(key) !== null;
  }

  public async setItem<T>({ key, serialize = JSON.stringify, value }: SetOptions<T>) {
    try {
      localStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }
}
