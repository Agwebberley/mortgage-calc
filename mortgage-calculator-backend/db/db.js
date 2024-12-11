const path = require('path');

const file = path.join(__dirname, 'db.json');

(async () => {
  const { Low } = await import('lowdb');
  const { JSONFilePreset } = await import('lowdb/node');

  const db = await JSONFilePreset(file, { users: [] });

  module.exports = db;
})();
