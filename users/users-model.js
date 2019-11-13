const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findByUsername,
  findByDepartment
};

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}
function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id });
}

function findByUsername(username) {
  return db("users")
    .where({ username })
    .first();
}

function findByDepartment(department) {
    return db("users").where({department})
}