const pgp = require("pg-promise")({
  capSQL: true,
});

const config = require("../../config");

const db = pgp(config.DB_CONNECTION);

const UserModel = {
  list: () => db.any("SELECT * FROM users"),

  find: (fields) => db.any(`SELECT * FROM users WHERE ${fields.reduce((conditions, field) => (
    `${conditions} ${!field.with ? "" : field.with} ${field.name} = '${field.value}'`
  ), "")}`),

  add: (user) => db.one(
    "INSERT INTO users($[this:name]) VALUES($[this:csv]) RETURNING nickname",
    user,
  ),

  update: (nickname, user) => {
    if (user.nickname) {
      throw new Error("nickname can't be changed");
    }

    const query = `${pgp.helpers.update(user, null, "users")} WHERE nickname = '${nickname}'  RETURNING *`;

    return db.one(query);
  },

  delete: (nickname) => db.result(
    "DELETE FROM users WHERE nickname = $1 RETURNING *",
    [nickname],
    (r) => r.rows,
  ),
};

module.exports = UserModel;
