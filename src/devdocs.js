const fetch = require('./fetch');
const pkg = require('../package.json');

/**
 * Composite ID
 *
 * @param  {string} suffix Suffix of the id
 * @return {string}        Returns the composite id
 */
const compositeId = suffix => `${pkg.name}.${suffix}`;

/**
 * Search for a word in a string
 *
 * @param  {string}  searchString Search word
 * @param  {string}  string       String to search for
 * @return {boolean}              Returns true or false if the word was found
 */
const search = (searchString, string) => (
  string.toLowerCase().includes(searchString.toLowerCase())
);

/**
 * Search for documentation
 *
 * @param  {string}  query Search word
 * @return {Promise}       Returns a promise that is fulfilled with the JSON result
 */
const searchDocs = query => (
  new Promise((resolve, reject) => (
    fetch.docs()
      .then(docs => docs.filter(doc => search(query, doc.name)))
      .then(docs => (
        resolve(
          docs.map(doc => ({
            id: compositeId(doc.name),
            title: doc.name,
            value: `https://devdocs.io/${doc.slug}`,
            subtitle: doc.release,
            icon: `./icons/${doc.slug.split('~')[0]}.png`,
          })),
        )
      ))
      .catch(error => reject(error))
  ))
);

/**
 * Search for a query within a documentation
 *
 * @param  {string}  docQuery    Documentation to be searched for
 * @param  {string}  searchQuery Query to be searched for
 * @return {Promise}             Returns a promise that is fulfilled with the JSON result
 */
const searchInDoc = (docQuery, searchQuery) => (
  new Promise((resolve, reject) => (
    fetch.docs()
      .then(docs => docs.filter(doc => search(docQuery, doc.name)))
      .then(docs => (
        docs.map(doc => (
          fetch.doc(doc.slug)
            .then(data => data.entries.filter(entry => search(searchQuery, entry.name)))
            .then(entries => (
              resolve(
                entries.map(entry => ({
                  id: compositeId(entry.name),
                  title: entry.name,
                  value: `https://devdocs.io/${doc.slug}/${entry.path}`,
                  subtitle: doc.name,
                  icon: `./icons/${doc.slug.split('~')[0]}.png`,
                })),
              )
            ))
            .catch(error => reject(error))
        ))
      ))
      .catch(error => reject(error))
  ))
);

module.exports.search = query => (
  // Search for a documentation e.g. "bootstrap"
  // or
  // search in a documentation e.g. "bootstrap modal"
  query.includes(' ') ? searchInDoc(...query.split(' ')) : searchDocs(query)
);
