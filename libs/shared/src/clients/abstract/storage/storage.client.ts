// NOTE: this file provides the main interfaces an StorageClient must have.
/* eslint-disable @typescript-eslint/no-unused-vars */
export default abstract class StorageClient {
  public static readonly token = Symbol.for(this.name);

  public clear(): Promise<boolean>;
  public clear(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.clear.name} available`);
  }

  public deleteItem(key: string): Promise<boolean>;
  public deleteItem(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.deleteItem.name} available`);
  }

  public getItem<T>(key: string, deserialize: (value: string) => T): Promise<T | undefined>;
  public getItem<T>(key: string, deserialize: (value: string) => T, defaultValue: T): Promise<T>;
  public getItem<T>(): Promise<T> {
    throw new Error(`No implementation of StorageClient.${this.getItem.name} available`);
  }

  public has(key: string): Promise<boolean>;
  public has(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.has.name} available`);
  }

  public setItem<T>(key: string, value: T, serialize?: (value: T) => string): Promise<boolean>;
  public setItem<T>(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.setItem.name} available`);
  }
}
