import envConfig from './env.config';

describe('envConfig', () => {
  it('should get value from `process.env`', () => {
    expect(envConfig.env).toEqual(process.env.NODE_ENV);
  });
});
