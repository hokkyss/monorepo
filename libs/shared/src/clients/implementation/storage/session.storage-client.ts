import type {
  DefaultOptions,
  GetOptions,
  GetOptionsWithDefaultValue,
  SetOptions,
} from '../../abstract/storage/storage.client';

import { injectable, singleton } from 'tsyringe';

import StorageClient from '../../abstract/storage/storage.client';

@injectable()
@singleton()
export default class SessionStorageClient extends StorageClient {
  public override async clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  public override async deleteItem({ key }: DefaultOptions) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  public override getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  public override getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  public override async getItem<T>({
    defaultValue,
    deserialize = JSON.parse,
    key,
  }: GetOptions<T> | GetOptionsWithDefaultValue<T>): Promise<T | undefined> {
    const item = sessionStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item) as T;
  }

  public override async has({ key }: DefaultOptions) {
    return sessionStorage.getItem(key) !== null;
  }

  public override async setItem<T>({ key, serialize = JSON.stringify, value }: SetOptions<T>) {
    try {
      sessionStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }
}
