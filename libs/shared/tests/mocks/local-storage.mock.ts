/**
 * Mock browser's local storage.
 */

const mockLocalStorage = {
  clear: vi.fn(),
  getItem: vi.fn(),
  key: vi.fn(),
  removeItem: vi.fn(),
  setItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

export default mockLocalStorage;
