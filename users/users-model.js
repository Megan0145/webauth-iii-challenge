const db = require("../data/db-config");

module.exports = {
  add,
  findByUsername
};

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("users").where({ user_id: id });
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}
