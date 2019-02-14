let FileReader = require('./FileReader');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');

let DB = {
	data : []
};

let reader = new FileReader('8193.23andme.6530');
let cb = (data) => {
	console.log(data.length);
	DB.data = data;
};

reader.read(cb);



var schema = buildSchema(`
  type Query {
    getRecord(id: String): Data
    getPage(page:Int, count:Int): [Data]
  }

  type Data {
    rsid: String!
    chromosome: String!
    position: String!
    genotype: String!
  }

  type Page {
  	page: Int
  	count: Int
  }

`);

var root = { 
	getRecord: (data) => {
		console.log(data);
		return DB.data.find( function (obj) {
			return (obj.rsid == data.id);
		});
	},
	getPage: (params) => {
		console.log("Params : ", params);
		let page = params.page;
		let count = params.count;
		if(page > 0) {
			let pageBlock = (page * count);
			let start = (pageBlock - count) >= 0 ? (pageBlock - count) : 0;
			let end = (pageBlock) < DB.data.length ? (pageBlock ) : DB.data.length;
			console.log( start + " -> " + end);
			return DB.data.slice(start,  end);
		}
		return [];
	}
};

var app = express();
app.use('/graphql',cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

