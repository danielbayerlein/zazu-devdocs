describe('fetch.js', () => {
  let got
  let fetch
  let cache

  const pkg = require('../../package.json')

  beforeEach(() => {
    jest.mock('got')
    got = require('got')

    jest.mock('cache-conf')
    cache = { get: jest.fn(), isExpired: jest.fn(), set: jest.fn() }
    require('cache-conf').mockImplementation(() => cache)

    jest.mock('../../package.json', () => ({
      homepage: 'https://github.com/danielbayerlein/zazu-devdocs#readme',
      name: 'zazu-devdocs',
      version: '1.0.0'
    }))

    fetch = require('../../src/fetch')
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  describe('fetchDocs', () => {
    const mockResult = require('../../__mocks__/docs.json')

    beforeEach(() => {
      got.mockImplementation(() => new Promise((resolve) => resolve({
        body: require('../../__mocks__/docs.json')
      })))
    })

    test('call got with url and options', () => (
      fetch.docs()
        .then(() => {
          expect(got).toHaveBeenCalledWith(
            'https://devdocs.io/docs/docs.json',
            {
              json: true,
              headers: {
                'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`
              }
            }
          )
        })
    ))

    test('returns the expected error', () => {
      const message = "The page you were looking for doesn't exist."

      got.mockImplementation(() => new Promise((resolve, reject) => reject(message)))

      return fetch.docs()
        .catch((err) => {
          expect(err).toBe(message)
        })
    })

    test('call cache.get with the expected arguments', () => (
      fetch.docs()
        .then(() => {
          expect(cache.get).toBeCalledWith(
            'zazu-devdocs.docs',
            { ignoreMaxAge: true }
          )
        })
    ))

    test('call cache.set with the expected arguments', () => (
      fetch.docs()
        .then(() => {
          expect(cache.set).toBeCalledWith(
            'zazu-devdocs.docs',
            mockResult,
            { maxAge: 86400000 }
          )
        })
    ))

    test('call cache.isExpired with the expected argument', () => {
      cache.get = jest.fn(() => mockResult)

      return fetch.docs()
        .then(() => {
          expect(cache.isExpired).toBeCalledWith('zazu-devdocs.docs')
        })
    })

    test('returns the cache result', () => {
      cache.isExpired = jest.fn(() => false)
      cache.get = jest.fn(() => mockResult)

      return fetch.docs()
        .then((docs) => {
          expect(docs).toEqual(mockResult)
        })
    })

    test('returns the cache result when an error occurs', () => {
      cache.isExpired = jest.fn(() => true)
      cache.get = jest.fn(() => mockResult)

      // eslint-disable-next-line prefer-promise-reject-errors
      got.mockImplementation(() => new Promise((resolve, reject) => reject()))

      return fetch.docs()
        .then((docs) => {
          expect(docs).toEqual(mockResult)
        })
    })
  })

  describe('fetchDoc', () => {
    const mockResult = require('../../__mocks__/doc.json')

    beforeEach(() => {
      got.mockImplementation(() => new Promise((resolve) => resolve({
        body: require('../../__mocks__/doc.json')
      })))
    })

    test('call got with url and options', () => (
      fetch.doc('bootstrap~4')
        .then(() => {
          expect(got).toHaveBeenCalledWith(
            'https://docs.devdocs.io/bootstrap~4/index.json',
            {
              json: true,
              headers: {
                'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`
              }
            }
          )
        })
    ))

    test('returns the expected error', () => {
      const message = "The page you were looking for doesn't exist."

      got.mockImplementation(() => new Promise((resolve, reject) => reject(message)))

      return fetch.doc('bootstrap~4')
        .catch((err) => {
          expect(err).toBe(message)
        })
    })

    test('call cache.get with the expected arguments', () => (
      fetch.doc('bootstrap~4')
        .then(() => {
          expect(cache.get).toBeCalledWith(
            'zazu-devdocs.docs.bootstrap~4',
            { ignoreMaxAge: true }
          )
        })
    ))

    test('call cache.set with the expected arguments', () => (
      fetch.doc('bootstrap~4')
        .then(() => {
          expect(cache.set).toBeCalledWith(
            'zazu-devdocs.docs.bootstrap~4',
            mockResult,
            { maxAge: 86400000 }
          )
        })
    ))

    test('call cache.isExpired with the expected argument', () => {
      cache.get = jest.fn(() => mockResult)

      return fetch.doc('bootstrap~4')
        .then(() => {
          expect(cache.isExpired).toBeCalledWith('zazu-devdocs.docs.bootstrap~4')
        })
    })

    test('returns the cache result', () => {
      cache.isExpired = jest.fn(() => false)
      cache.get = jest.fn(() => mockResult)

      return fetch.doc('bootstrap~4')
        .then((doc) => {
          expect(doc).toEqual(mockResult)
        })
    })

    test('returns the cache result when an error occurs', () => {
      cache.isExpired = jest.fn(() => true)
      cache.get = jest.fn(() => mockResult)

      // eslint-disable-next-line prefer-promise-reject-errors
      got.mockImplementation(() => new Promise((resolve, reject) => reject()))

      return fetch.docs()
        .then((docs) => {
          expect(docs).toEqual(mockResult)
        })
    })
  })
})
