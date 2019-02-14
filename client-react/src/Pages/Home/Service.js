import axios from 'axios';

export const Service = {
	getPage : (page, count=10, cb) => {
		axios({
		  url: 'http://localhost:4000/graphql?',
		  method: 'post',
		  data: {
		    query: `\n{\n  records : getPage(page: ${page}, count: ${count}) {\n    rsid\n    chromosome\n    position\n    genotype\n  }\n}`
		  }
		}).then((result) => {
		  cb(result.data.data.records);
		});
	}
}