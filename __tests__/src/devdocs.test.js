/* eslint global-require: 0 */

describe('devdocs.js', () => {
  describe('search', () => {
    let fetch;
    let devdocs;

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
      test('returns an array with the expected structure', () => (
        devdocs
          .search('bootstrap')
          .then((docs) => {
            expect(docs).toBeInstanceOf(Array);

            expect(docs[0]).toEqual({
              id: 'zazu-devdocs.Bootstrap',
              title: 'Bootstrap',
              value: 'https://devdocs.io/bootstrap~4',
              subtitle: 'alpha.6',
              icon: './icons/bootstrap.png',
            });
          })
      ));

      test('if fetch.docs fails then return the expected error', () => {
        const message = "The page you were looking for doesn't exist.";

        fetch.docs.mockImplementation(() => new Promise((resolve, reject) => reject(message)));

        return devdocs.search('bootstrap')
          .catch((error) => {
            expect(error).toBe(message);
          });
      });
    });

    describe('searchInDoc', () => {
      test('returns an array with the expected structure', () => (
        devdocs
          .search('bootstrap modal')
          .then((docs) => {
            expect(docs).toBeInstanceOf(Array);

            expect(docs[0]).toEqual({
              id: 'zazu-devdocs.Modal',
              title: 'Modal',
              value: 'https://devdocs.io/bootstrap~4/components/modal',
              subtitle: 'Bootstrap',
              icon: './icons/bootstrap.png',
            });
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
