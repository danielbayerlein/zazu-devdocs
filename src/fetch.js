const got = require('got');
const CacheConf = require('cache-conf');
const pkg = require('../package.json');

const GOT_OPTIONS = {
  json: true,
  headers: {
    'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`,
  },
};

const CACHE_CONF = {
  key: 'zazu-devdocs', // cache key prefix
  maxAge: 86400000, // 1 day
};

const cache = new CacheConf();

/**
 * Fetch the URL, cache the result and return it.
 * Returns the cache result if it is valid.
 *
 * @param  {string}  url URL to fetch
 * @param  {string}  key Cache key
 * @return {Promise}     Returns a promise that is fulfilled with the JSON result
 */
const fetch = (url, key) => {
  const cachedResponse = cache.get(key, { ignoreMaxAge: true });

  if (cachedResponse && !cache.isExpired(key)) {
    return Promise.resolve(cachedResponse);
  }

  return got(url, GOT_OPTIONS)
    .then((response) => {
      const data = response.body;
      cache.set(key, data, { maxAge: CACHE_CONF.maxAge });
      return data;
    })
    .catch((error) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      throw error;
    });
};

const fetchDocs = () => (
  fetch('https://devdocs.io/docs/docs.json', `${CACHE_CONF.key}.docs`)
);

const fetchDoc = slug => (
  fetch(`https://docs.devdocs.io/${slug}/index.json`, `${CACHE_CONF.key}.docs.${slug}`)
);

module.exports = {
  docs: fetchDocs,
  doc: fetchDoc,
};
