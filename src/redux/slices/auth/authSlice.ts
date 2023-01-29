import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { RootState } from '../../store'
import { AuthState, IAuthResponse, Status } from './types'

export const fetchLogin = createAsyncThunk<IAuthResponse, Form>(
	'auth/fethchAuth',
	async params => {
		const { data } = await axios.post<IAuthResponse>('/auth/login', params)
		return data
	}
)

export const fetchSingUp = createAsyncThunk<IAuthResponse, Form>(
	'auth/fetchSignUp',
	async params => {
		const { data } = await axios.post<IAuthResponse>('/auth/signup', params)
		return data
	}
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
	const { data } = await axios.post('auth/logout')
	return data
})

const initialState: AuthState = {
	status: Status.LOADING,
	isAuth: false,
	tokens: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder

			// LOGIN
			.addCase(fetchLogin.pending, state => {
				state.status = Status.LOADING
				state.isAuth = false
			})
			.addCase(fetchLogin.fulfilled, state => {
				state.status = Status.SUCCESS
				state.isAuth = true
				if (state.tokens) {
					localStorage.setItem('token', state.tokens?.accessToken)
				}
			})
			.addCase(fetchLogin.rejected, state => {
				state.status = Status.ERROR
				state.isAuth = false
			})

			// SIGNUP
			.addCase(fetchSingUp.pending, state => {
				state.status = Status.LOADING
				state.isAuth = false
			})
			.addCase(fetchSingUp.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				if (state.tokens) {
					localStorage.setItem('token', state.tokens.accessToken)
				}
			})
			.addCase(fetchSingUp.rejected, (state, action) => {
				state.status = Status.ERROR
				state.isAuth = false
			})

			// LOGOUT
			.addCase(fetchLogout.pending, state => {
				state.status = Status.LOADING
				state.isAuth = false
				if (state.tokens) {
					state.tokens = null
				}
				localStorage.removeItem('token')
			})
			.addCase(fetchLogout.fulfilled, state => {
				state.status = Status.SUCCESS
				state.isAuth = false
				if (state.tokens) {
					state.tokens = null
				}
				localStorage.removeItem('token')
			})
			.addCase(fetchLogout.rejected, state => {
				state.status = Status.ERROR
				state.isAuth = false
				if (state.tokens) {
					state.tokens = null
				}
				localStorage.removeItem('token')
			})
	},
})

export const isAuthSelector = (state: RootState) => state.auth.isAuth

export default authSlice.reducer
