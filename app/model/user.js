const pool = require('../model/pg');
var User = {
  getById: function (user) {
    var sql = `select * from users where id=${user}`;
    console.log(sql);
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (errors, result) {
        if (errors) {
          reject(errors);
        }
        else {
          resolve(result.rows[0]);
        }
      });
    });
  },
  getAll: () => {
    return new Promise(function (resolve, reject) {
      var sql = `select users.*, role.name as role_name from users,role where role.id = users.role_id`;
      //console.log(sql);
      pool.query(sql, function (errors, result) {
        if (errors) {
          reject(errors);
        }
        else {
          resolve(result.rows);
        }
      });
    });
  },
  ban: (id) => {
    return new Promise(function (resolve, reject) {
      var sql = `update users set active = false where id = ${id}`;
      //console.log(sql);
      pool.query(sql, function (errors, result) {
        if (errors) {
          reject(errors);
        }
        else {
          resolve(result.rows);
        }
      });
    });
  },
  unban: (id) => {
    return new Promise(function (resolve, reject) {
      var sql = `update users set active = true where id = ${id}`;
      //console.log(sql);
      pool.query(sql, function (errors, result) {
        if (errors) {
          reject(errors);
        }
        else {
          resolve(result.rows);
        }
      });
    });
  },
  updateRole: (user) => {
    return new Promise(function (resolve, reject) {
      var sql = `update users set role_id = ${user.role_id} where id = ${user.id}`;
      //console.log(sql);
      pool.query(sql, function (errors, result) {
        if (errors) {
          reject(errors);
        }
        else {
          resolve(result.rows);
        }
      });
    });
  },
}

module.exports = User;