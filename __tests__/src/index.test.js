const index = require('../../src/');
const devdocs = require('../../src/devdocs');

describe('index.js', () => {
  beforeEach(() => {
    devdocs.search = jest.fn();
    index()('bootstrap');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('call devdocs.search with "bootstrap"', () => {
    expect(devdocs.search).toBeCalledWith('bootstrap');
  });
});
