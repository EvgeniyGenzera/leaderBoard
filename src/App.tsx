import React from 'react';
import Header from './components/Header';
import Table from './components/Table';

function App() {
	return (
		<div className="App">
			<h1 className="page-title">
				Cube<span>19</span>Leaderboard
			</h1>
			<Header />
			<Table />
		</div>
	);
}

export default App;
