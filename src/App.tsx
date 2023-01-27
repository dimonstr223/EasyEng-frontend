import React from 'react'
import { Routes, Route } from 'react-router-dom'

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
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
