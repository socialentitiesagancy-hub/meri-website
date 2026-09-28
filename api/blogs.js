const { createListHandler } = require('./_lib/store.js');

module.exports = createListHandler({ key: 'data/blogs.json', max: 50 });
