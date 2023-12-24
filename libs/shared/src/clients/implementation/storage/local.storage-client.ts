import type {
  DefaultOptions,
  GetOptions,
  GetOptionsWithDefaultValue,
  SetOptions,
} from '../../abstract/storage/storage.client';

import { injectable, singleton } from 'tsyringe';

import StorageClient from '../../abstract/storage/storage.client';

export default class LocalStorageClient extends StorageClient {
  public override async clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  public override async deleteItem({ key }: DefaultOptions) {
    try {
      localStorage.removeItem(key);
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
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item);
  }

  public override async has({ key }: DefaultOptions) {
    return localStorage.getItem(key) !== null;
  }

  public override async setItem<T>({ key, serialize = JSON.stringify, value }: SetOptions<T>) {
    try {
      localStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }
}

// FIXME: temporary workaround to fix rollup errors
singleton()(LocalStorageClient);
injectable()(LocalStorageClient);
