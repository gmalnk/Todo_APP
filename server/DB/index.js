const {Pool} = require("pg")

const pool = new Pool();


// module.exports = function query(text, params) { return pool.query(text, params); }

module.exports =   {
    query :(text, params)=>pool.query(text, params)
}