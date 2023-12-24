export type DefaultOptions = {
  key: string;
};

export type GetOptions<T> = DefaultOptions & {
  defaultValue?: never;
  deserialize?: (value: any) => T;
};

export type GetOptionsWithDefaultValue<T> = DefaultOptions & {
  defaultValue: T;
  deserialize?: (value: any) => T;
};

export type SetOptions<T> = DefaultOptions & {
  serialize?: (value: T) => any;
  value: T;
};

export default abstract class StorageClient {
  public static readonly token = Symbol.for(this.name);

  public abstract clear(): Promise<boolean>;
  public abstract deleteItem(options: DefaultOptions): Promise<boolean>;
  public abstract getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  public abstract getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  public abstract has(options: DefaultOptions): Promise<boolean>;
  public abstract setItem<T>(options: SetOptions<T>): Promise<boolean>;
}
