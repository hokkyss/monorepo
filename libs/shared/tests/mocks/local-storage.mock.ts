/**
 * We do not use `vi.fn()` to mock so we can spy on each function better.
 *
 * Mock browser's local storage.
 */
const mockLocalStorage: Pick<Storage, 'clear' | 'getItem' | 'key' | 'removeItem' | 'setItem'> = {
  clear: () => {},
  getItem: () => '',
  key: () => '',
  removeItem: () => {},
  setItem: () => {},
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

export default mockLocalStorage;
