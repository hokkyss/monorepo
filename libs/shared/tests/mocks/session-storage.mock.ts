// We do not use vi.fn() to mock so we can spy on each function better

const mockSessionStorage: Pick<Storage, 'clear' | 'getItem' | 'key' | 'removeItem' | 'setItem'> = {
  clear: () => {},
  getItem: () => '',
  key: () => '',
  removeItem: () => {},
  setItem: () => {},
};

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

export default mockSessionStorage;
