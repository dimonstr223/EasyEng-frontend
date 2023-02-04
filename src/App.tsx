import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import useAppDispatch from './hooks/useAppDispatch'
import CardsPage from './pages/CardsPage/CardsPage'
import CreateCardPage from './pages/CreateCardPage/CreateCardPage'
import EditCardPage from './pages/EditCardPage/EditCardPage'

import HomePage from './pages/HomePage/HomePage'
import Layout from './pages/Layout/Layout'
import LoginPage from './pages/LoginPage/LoginPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import { fetchMe } from './redux/auth/asyncThunks/authAsyncThunks'

import './scss/App.scss'

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	// useEffect(() => {
	// 	dispatch(fetchMe())
	// }, [])

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/cards' element={<CardsPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/create-card' element={<CreateCardPage />} />
					<Route path='/edit-card/:id' element={<EditCardPage />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
