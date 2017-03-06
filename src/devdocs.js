const fetch = require('./fetch');

const search = (searchString, string) => (
  string.toLowerCase().includes(searchString.toLowerCase())
);

const searchDocs = query => (
  fetch.docs()
    .then(docs => docs.filter(doc => search(query, doc.name)))
    .then(docs => (
      docs.map(doc => (
        {
          title: doc.name,
          value: `https://devdocs.io/${doc.slug}`,
          subtitle: doc.release,
          icon: `./icons/${doc.slug.split('~')[0]}.png`,
        }
      ))
    ))
    .catch(error => console.error(error)) // eslint-disable-line no-console
);

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
                entries.map(entry => (
                  {
                    title: entry.name,
                    value: `https://devdocs.io/${doc.slug}/${entry.path}`,
                    subtitle: doc.name,
                    icon: `./icons/${doc.slug.split('~')[0]}.png`,
                  }
                )),
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
