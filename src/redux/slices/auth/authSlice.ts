import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { RootState } from '../../store'
import { AuthState, IAuthResponse, Status, IMe } from './types'

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
	const { data } = await axios.delete('auth/logout')
	return data
})

export const fetchMe = createAsyncThunk<IMe>('auth/fetchMe', async () => {
	const { data } = await axios.get<IMe>('/me')
	return data
})

const initialState: AuthState = {
	status: Status.LOADING,
	me: null,
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
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				localStorage.setItem('token', action.payload.accessToken)
			})
			.addCase(fetchLogin.rejected, state => {
				state.status = Status.ERROR
			})

			// SIGNUP
			.addCase(fetchSingUp.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchSingUp.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				localStorage.setItem('token', action.payload.accessToken)
			})
			.addCase(fetchSingUp.rejected, (state, action) => {
				state.status = Status.ERROR
			})

			// LOGOUT
			.addCase(fetchLogout.pending, state => {
				state.status = Status.LOADING
			})
			.addCase(fetchLogout.fulfilled, state => {
				state.status = Status.SUCCESS
				localStorage.removeItem('token')
			})
			.addCase(fetchLogout.rejected, state => {
				state.status = Status.ERROR
				localStorage.removeItem('token')
			})
	},
})

export default authSlice.reducer
