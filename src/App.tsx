import React from 'react'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import './scss/App.scss'

function App() {
	return (
		<div className='App'>
			<div className='container'>
				<Header />
				<HomePage />
			</div>
		</div>
	)
}

export default App
