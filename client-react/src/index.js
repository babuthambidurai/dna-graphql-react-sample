import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.css'
import { Routes } from './Routes/Routes'

const title = "GraphQL "
class App extends React.Component {
    render() {
        return (
        	<div>
        	    <div className="column is-half is-offset-one-quarter">
        	        <div className="title">{title}</div>
        	    </div>
        	    <Routes />
        	</div>
        )
    }
}

ReactDOM.render(<App/>, app)
module.hot.accept();