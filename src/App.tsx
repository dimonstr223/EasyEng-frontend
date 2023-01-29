import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import useAppDispatch from './hooks/useAppDispatch'
import CardsPage from './pages/CardsPage/CardsPage'

import HomePage from './pages/HomePage/HomePage'
import Layout from './pages/Layout/Layout'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import { fetchMe } from './redux/slices/auth/authSlice'

import './scss/App.scss'

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchMe())
	}, [])

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/cards' element={<CardsPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
