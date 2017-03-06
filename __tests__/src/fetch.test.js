jest.mock('got');
jest.mock('cache-conf');

const pkg = require('../../package.json');

describe('fetch.js', () => {
  let got;
  let fetch;

  beforeEach(() => {
    got = require('got'); // eslint-disable-line global-require
    fetch = require('../../src/fetch'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe('fetchDocs', () => {
    beforeEach(() => {
      got.mockImplementation(() => new Promise(resolve => resolve({
        // eslint-disable-next-line global-require
        body: require('../../__mocks__/docs.json'),
      })));
    });

    test('call got with url and options', () => (
      fetch.docs()
        .then(() => {
          expect(got).toHaveBeenCalledWith(
            'https://devdocs.io/docs/docs.json',
            {
              json: true,
              headers: {
                'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`,
              },
            },
          );
        })
    ));
  });

  describe('fetchDoc', () => {
    beforeEach(() => {
      got.mockImplementation(() => new Promise(resolve => resolve({
        // eslint-disable-next-line global-require
        body: require('../../__mocks__/doc.json'),
      })));
    });

    test('call got with url and options', () => (
      fetch.doc('bootstrap~4')
        .then(() => {
          expect(got).toHaveBeenCalledWith(
            'https://docs.devdocs.io/bootstrap~4/index.json',
            {
              json: true,
              headers: {
                'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`,
              },
            },
          );
        })
    ));
  });
});
