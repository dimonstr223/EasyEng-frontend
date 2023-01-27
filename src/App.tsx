import React from 'react'

import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

import './scss/App.scss'

const App: React.FC = () => {
	return (
		<div className='App'>
			<div className='container'>
				<Header />
				<HomePage />
				{/* <LoginPage /> */}
				{/* <RegisterPage /> */}
			</div>
		</div>
	)
}

export default App
