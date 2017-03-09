describe('devdocs.js', () => {
  describe('search', () => {
    let fetch;
    let devdocs;
    let searchResult;

    beforeEach(() => {
      jest.mock('../../src/fetch');
      fetch = require('../../src/fetch'); // eslint-disable-line global-require
      devdocs = require('../../src/devdocs'); // eslint-disable-line global-require
      console.error = jest.fn(); // eslint-disable-line no-console

      fetch.docs.mockImplementation(() => new Promise(resolve => resolve(
        require('../../__mocks__/docs.json'), // eslint-disable-line global-require
      )));

      fetch.doc.mockImplementation(() => new Promise(resolve => resolve(
        require('../../__mocks__/doc.json'), // eslint-disable-line global-require
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

      test('call console.error with an error message', () => {
        const msg = "The page you were looking for doesn't exist.";

        fetch.docs.mockImplementation(() => new Promise((resolve, reject) => reject(msg)));

        return devdocs.search('bootstrap')
          .catch(() => {
            // eslint-disable-next-line no-console
            expect(console.error).toHaveBeenCalledWith(msg);
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

      test('if fetch.docs fails then call console.error with an error message', () => {
        const msg = "The page you were looking for doesn't exist.";

        fetch.docs.mockImplementation(() => new Promise((resolve, reject) => reject(msg)));

        return devdocs.search('bootstrap modal')
          .then(() => (
            // eslint-disable-next-line no-console
            expect(console.error).toHaveBeenCalledWith(msg)
          ));
      });

      test('if fetch.doc fails then call console.error with an error message', () => {
        const msg = "The page you were looking for doesn't exist.";

        fetch.doc.mockImplementation(() => new Promise((resolve, reject) => reject(msg)));

        return devdocs.search('bootstrap modal')
          .then(() => (
            // eslint-disable-next-line no-console
            expect(console.error).toHaveBeenCalledWith(msg)
          ));
      });
    });
  });

  describe('integration', () => {
    // eslint-disable-next-line global-require
    const devdocs = require('../../src/devdocs');

    describe('searchDocs', () => {
      const searchResult = devdocs.search('bootstrap');

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
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
      const searchResult = devdocs.search('bootstrap modal');

      test('returns an array', () => (
        searchResult.then((docs) => {
          expect(docs).toBeInstanceOf(Array);
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
