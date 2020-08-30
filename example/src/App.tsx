
import React from 'react';
import { UserList } from './components';

import './App.css';

class App extends React.PureComponent {
	render() {
		return (
			<div className="App">
        <h1>React mobx state tree with <i>easy-update-mst</i> example!</h1>
        <UserList />
    </div>
		);
	}
}

export default App;