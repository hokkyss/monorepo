export type DefaultOptions = {
  key: string;
};

export type GetOptions<T> = DefaultOptions & {
  defaultValue?: never;
  deserialize?: (value: string) => T;
};

export type GetOptionsWithDefaultValue<T> = DefaultOptions & {
  defaultValue: T;
  deserialize?: (value: string) => T;
};

export type SetOptions<T> = DefaultOptions & {
  serialize?: (value: T) => string;
  value: T;
};

export default abstract class StorageClient {
  public static readonly token = Symbol.for(this.name);

  public clear(): Promise<boolean>;
  public clear(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.clear.name} available`);
  }

  public deleteItem(options: DefaultOptions): Promise<boolean>;
  public deleteItem(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.deleteItem.name} available`);
  }

  public getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  public getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  public getItem<T>(): Promise<T> {
    throw new Error(`No implementation of StorageClient.${this.getItem.name} available`);
  }

  public has(options: DefaultOptions): Promise<boolean>;
  public has(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.has.name} available`);
  }

  public setItem<T>(options: SetOptions<T>): Promise<boolean>;
  public setItem(): Promise<boolean> {
    throw new Error(`No implementation of StorageClient.${this.setItem.name} available`);
  }
}
