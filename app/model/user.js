const pool = require('../model/pg');
var User = {
	getUserById: function(id) {
  var sql = 'select * from users where id=' + id;
    return new Promise(function(resolve, reject) {
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            resolve(result.rows[0]);
        }
      });
    });
  },
  getAllUser: function(){
    var sql = 'select users.*, role.name from users, role where users.role_id = role.id';
    return new Promise(function(resolve,reject){
      pool.query(sql, function(errors, result){
        if(errors)
          reject(errors);
        else
          resolve(result.rows);
      })
    })
  },
  updateByID: function(user){
    return new Promise(function(resolve, reject){
      var query = `update users set email = '${user.email}', fullname = '${user.fullname}', phone = '${user.phone}', role_id = ${user.role_id}, active = ${user.active} where id = ${user.id}`
      pool.query(query, function(errors, result){
        if(errors)
          reject(errors);
        else
          resolve(result);
      })
    })
  }
}

module.exports = User;