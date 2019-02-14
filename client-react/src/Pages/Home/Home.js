import React from 'react'
import { NavBar }  from '../../components/Navbar/NavBar';
import {Service} from './Service';

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			data : [],
			page : 1,
			count : 10
		}
	}
	componentDidMount() {
		this.load(1);
	}

	load(page) {
		let self=this;
		let count = self.state.count;
		Service.getPage(page,count, (data) => {
			self.setState({
				page: page,
				data : data
			});
		});
	}

	previous() {
		this.load(this.state.page - 1);
	}

	next() {
		this.load(this.state.page + 1);
	}

	render() {
		return (
			<div>
			    <div className="columns">
			        <div className="column is-half is-offset-one-quarter">
			            <table className="table is-bordered is-striped is-hoverable">
			            	<tbody>
				            	<tr>
				            		<th>RSID</th>
				            		<th>Chromosome </th>
				            		<th>Position</th>
				            		<th>Genotype</th>
				            	</tr>
				            	{
				            		this.state.data.map(function (obj, i) {
				            			 return <tr key={i}>
				            				<td>{obj.rsid}</td>
				            				<td>{obj.chromosome}</td>
				            				<td>{obj.position}</td>
				            				<td>{obj.genotype}</td>
				            			</tr>;
				            		})
				            	}
			            	</tbody>
			            </table>
			        </div>
			    </div>
			    <div className="columns">
			    	<div className="column is-offset-one-quarter">
			    		<button className="button " onClick={this.previous.bind(this)}>Previous</button>
			    		<button className="button " onClick={this.next.bind(this)}>Next</button>
			    	</div>
			    	<div className="column ">
			    		Page : {this.state.page}
			    	</div>
			    </div>
			</div>
		)
   	}
}