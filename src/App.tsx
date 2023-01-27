import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import Layout from './pages/Layout/Layout'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

import './scss/App.scss'

const App: React.FC = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
