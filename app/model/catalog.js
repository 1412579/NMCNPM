const pool = require('../model/pg');
var Catalog = {
	newCata: (cateInfo) => {
        return new Promise((resolve,reject)=>{
            var query = `insert into catalog(name,slug,orderb,isHide,created_at,updated_at) values('${ cateInfo.name }','${ cateInfo.slug }', ${cateInfo.orderb },${ cateInfo.isHide},'${ cateInfo.created_at }','${ cateInfo.updated_at }')`;
            console.log(query);
            pool.query(query, function(err, res){
                if (err){
                    reject(err);
                }
                else{
                    console.log(res);
                    resolve(res);
                }
                    
            });
        });
	},
	getAll: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from catalog order by orderb asc, id desc`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows);
            });
        })
		
	},
	getById: (id)=>{
        return new Promise((resolve,reject)=>{
            pool.query(`select * from catalog where id=${id}`, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve(result.rows[0]);
            });
        });
	},
	updateById: function(cateInfo){
        return new Promise((resolve,reject)=>{
            var query = `update catalog set name = '${ cateInfo.name }', slug = '${ cateInfo.slug }', orderb = ${ cateInfo.orderb }, updated_at = '${ cateInfo.updated_at }', ishide = ${ cateInfo.ishide } where id = ${ cateInfo.id}`;
            console.log(query);
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
	},
	visible: function(cataInfo){
        return new Promise((resolve,reject)=>{
            console.log(cataInfo);
            var query = `update catalog set ishide = ${cataInfo.hide} where id = ${cataInfo.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
	},
	delete: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from catalog where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result);
            });
        });
	}, 
}

module.exports = Catalog;