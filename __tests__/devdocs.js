describe('devdocs.js', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe('search', () => {
    let got;
    let devdocs;
    let pkg;

    beforeEach(() => {
      jest.mock('got');
      got = require('got'); // eslint-disable-line global-require
      devdocs = require('../src/devdocs'); // eslint-disable-line global-require
      pkg = require('../package.json'); // eslint-disable-line global-require
      console.error = jest.fn(); // eslint-disable-line no-console

      got.mockImplementation(() => new Promise(resolve => resolve({
        // eslint-disable-next-line global-require
        body: require('../__mocks__/result.json'),
      })));
    });

    test('call got with url and options', () => (
      devdocs.search('bootstrap')
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

    test('returns an array', () => (
      devdocs.search('bootstrap')
        .then((packages) => {
          expect(packages).toBeInstanceOf(Array);
        })
      ));

    test('returns the expected title', () => (
      devdocs.search('bootstrap')
        .then((packages) => {
          expect(packages[0].title).toBe('Bootstrap');
        })
      ));

    test('returns the expected value', () => (
      devdocs.search('bootstrap')
        .then((packages) => {
          expect(packages[0].value).toBe('https://devdocs.io/bootstrap~4');
        })
      ));

    test('returns the expected subtitle', () => (
      devdocs.search('bootstrap')
        .then((packages) => {
          expect(packages[0].subtitle).toBe('alpha.6');
        })
    ));

    test('returns the expected icon', () => (
      devdocs.search('bootstrap')
        .then((packages) => {
          expect(packages[0].icon).toBe('./icons/bootstrap.png');
        })
    ));

    test('call console.error with an error message', () => {
      const body = 'It may be missing from the source documentation or this could be a bug.';

      got.mockImplementation(() => new Promise((resolve, reject) => reject({
        response: { body },
      })));

      return devdocs.search('bootstrap')
        .catch(() => {
          // eslint-disable-next-line no-console
          expect(console.error).toHaveBeenCalledWith(body);
        });
    });
  });

  describe('integration', () => {
    // eslint-disable-next-line global-require
    const devdocs = require('../src/devdocs');
    const searchResult = devdocs.search('bootstrap');

    test('returns an array', () => (
      searchResult.then((packages) => {
        expect(packages).toBeInstanceOf(Array);
      })
    ));

    test('returns an object with a title', () => (
      searchResult.then((packages) => {
        expect(packages[0].title).toBeDefined();
      })
    ));

    test('returns an object with a value', () => (
      searchResult.then((packages) => {
        expect(packages[0].value).toBeDefined();
      })
    ));

    test('returns an object with a subtitle', () => (
      searchResult.then((packages) => {
        expect(packages[0].subtitle).toBeDefined();
      })
    ));

    test('returns an object with an icon', () => (
      searchResult.then((packages) => {
        expect(packages[0].icon).toBeDefined();
      })
    ));
  });
});
