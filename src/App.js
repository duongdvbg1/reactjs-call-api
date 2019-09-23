import React, { Component } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import routes from './routes';
import Menu from './components/Menu';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Menu />
					<div className="container">
						 <div className="row">
							{ this.showContentMenus(routes) }
						</div>
						
					</div>
				</div>
			</Router>
		);
	}

	showContentMenus = (routes) => {
		var result = null;
		if(routes.length > 0) {
			result = routes.map((route, i)=> {
				return (
					<Route
						key={i}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				)
			})
		}
		return <Switch>{result}</Switch>
	}
}

export default App;
