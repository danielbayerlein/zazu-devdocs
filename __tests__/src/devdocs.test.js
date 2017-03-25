/* eslint global-require: 0 */

describe('devdocs.js', () => {
  describe('search', () => {
    let fetch;
    let devdocs;
    let searchResult;

    beforeEach(() => {
      jest.mock('../../src/fetch');
      fetch = require('../../src/fetch');
      devdocs = require('../../src/devdocs');

      fetch.docs.mockImplementation(() => new Promise(resolve => resolve(
        require('../../__mocks__/docs.json'),
      )));

      fetch.doc.mockImplementation(() => new Promise(resolve => resolve(
        require('../../__mocks__/doc.json'),
      )));
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.resetModules();
    });

    describe('searchDocs', () => {
      beforeEach(() => {
        searchResult = devdocs.search('bootstrap');
      });

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
        })
      ));

      test('returns the expected id', () => (
        searchResult.then((docs) => {
          expect(docs[0].id).toBe('zazu-devdocs.Bootstrap');
        })
      ));

      test('returns the expected title', () => (
        searchResult.then((docs) => {
          expect(docs[0].title).toBe('Bootstrap');
        })
      ));

      test('returns the expected value', () => (
        searchResult.then((docs) => {
          expect(docs[0].value).toBe('https://devdocs.io/bootstrap~4');
        })
      ));

      test('returns the expected subtitle', () => (
        searchResult.then((docs) => {
          expect(docs[0].subtitle).toBe('alpha.6');
        })
      ));

      test('returns the expected icon', () => (
        searchResult.then((docs) => {
          expect(docs[0].icon).toBe('./icons/bootstrap.png');
        })
      ));

      test('returns the expected error', () => {
        const message = "The page you were looking for doesn't exist.";

        fetch.docs.mockImplementation(() => new Promise((resolve, reject) => reject(message)));

        return devdocs.search('bootstrap')
          .catch((error) => {
            expect(error).toBe(message);
          });
      });
    });

    describe('searchInDoc', () => {
      beforeEach(() => {
        searchResult = devdocs.search('bootstrap modal');
      });

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
        })
      ));

      test('returns the expected id', () => (
        searchResult.then((docs) => {
          expect(docs[0].id).toBe('zazu-devdocs.Modal');
        })
      ));

      test('returns the expected title', () => (
        searchResult.then((docs) => {
          expect(docs[0].title).toBe('Modal');
        })
      ));

      test('returns the expected value', () => (
        searchResult.then((docs) => {
          expect(docs[0].value).toBe('https://devdocs.io/bootstrap~4/components/modal');
        })
      ));

      test('returns the expected subtitle', () => (
        searchResult.then((docs) => {
          expect(docs[0].subtitle).toBe('Bootstrap');
        })
      ));

      test('returns the expected icon', () => (
        searchResult.then((docs) => {
          expect(docs[0].icon).toBe('./icons/bootstrap.png');
        })
      ));

      test('if fetch.docs fails then return the expected error', () => {
        const message = "The page you were looking for doesn't exist.";

        fetch.docs.mockImplementation(() => new Promise((resolve, reject) => reject(message)));

        return devdocs.search('bootstrap modal')
          .catch((error) => {
            expect(error).toBe(message);
          });
      });

      test('if fetch.doc fails then return the expected error', () => {
        const message = "The page you were looking for doesn't exist.";

        fetch.doc.mockImplementation(() => new Promise((resolve, reject) => reject(message)));

        return devdocs.search('bootstrap modal')
          .catch((error) => {
            expect(error).toBe(message);
          });
      });
    });
  });

  describe('integration', () => {
    jest.mock('cache-conf');

    const devdocs = require('../../src/devdocs');

    describe('searchDocs', () => {
      const searchResult = devdocs.search('bootstrap');

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
        })
      ));

      test('returns an object with a id', () => (
        searchResult.then((docs) => {
          expect(docs[0].id).toBeDefined();
        })
      ));

      test('returns an object with a title', () => (
        searchResult.then((docs) => {
          expect(docs[0].title).toBeDefined();
        })
      ));

      test('returns an object with a value', () => (
        searchResult.then((docs) => {
          expect(docs[0].value).toBeDefined();
        })
      ));

      test('returns an object with a subtitle', () => (
        searchResult.then((docs) => {
          expect(docs[0].subtitle).toBeDefined();
        })
      ));

      test('returns an object with an icon', () => (
        searchResult.then((docs) => {
          expect(docs[0].icon).toBeDefined();
        })
      ));
    });

    describe('searchInDoc', () => {
      jest.mock('cache-conf');

      const searchResult = devdocs.search('bootstrap modal');

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
        })
      ));

      test('returns an object with a id', () => (
        searchResult.then((docs) => {
          expect(docs[0].id).toBeDefined();
        })
      ));

      test('returns an object with a title', () => (
        searchResult.then((docs) => {
          expect(docs[0].title).toBeDefined();
        })
      ));

      test('returns an object with a value', () => (
        searchResult.then((docs) => {
          expect(docs[0].value).toBeDefined();
        })
      ));

      test('returns an object with a subtitle', () => (
        searchResult.then((docs) => {
          expect(docs[0].subtitle).toBeDefined();
        })
      ));

      test('returns an object with an icon', () => (
        searchResult.then((docs) => {
          expect(docs[0].icon).toBeDefined();
        })
      ));
    });
  });
});
