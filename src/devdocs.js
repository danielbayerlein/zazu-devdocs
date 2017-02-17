const got = require('got');
const pkg = require('../package.json');

const URL = 'https://devdocs.io';
const DOCS_URL = `${URL}/docs/docs.json`;
const GOT_OPTIONS = {
  json: true,
  headers: {
    'user-agent': `${pkg.name}/${pkg.version} (${pkg.homepage})`,
  },
};

module.exports.search = query => (
  got(DOCS_URL, GOT_OPTIONS)
    .then(response => (
      response.body
        .filter(doc => doc.type.search(query) !== -1)
        .map(doc => (
          {
            title: doc.name,
            value: `${URL}/${doc.slug}`,
            subtitle: doc.release,
            icon: `./icons/${doc.slug.split('~')[0]}.png`,
          }
        ))
    ))
    .catch((error) => {
      console.error(error.response.body); // eslint-disable-line no-console
    })
);
