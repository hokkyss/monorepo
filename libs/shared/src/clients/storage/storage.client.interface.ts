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

export default interface IStorageClient {
  clear: () => Promise<boolean>;
  deleteItem: (options: DefaultOptions) => Promise<boolean>;
  getItem: (<T>(options: GetOptions<T>) => Promise<T | undefined>) &
    (<T>(options: GetOptionsWithDefaultValue<T>) => Promise<T>);
  has: (options: DefaultOptions) => Promise<boolean>;
  setItem: <T>(options: SetOptions<T>) => Promise<boolean>;
}
