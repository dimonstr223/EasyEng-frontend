import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { RootState } from '../../store'
import { AuthState, IAuthResponse, IMe, Status } from './types'

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
	data: null,
	me: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchAuth.pending, state => {
				state.status = Status.LOADING
				state.data = null
			})
			.addCase(fetchAuth.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.data = action.payload
				window.localStorage.setItem('token', state.data.token)
			})
			.addCase(fetchAuth.rejected, state => {
				state.status = Status.ERROR
				state.data = null
			})
			.addCase(fetchMe.pending, state => {
				state.status = Status.LOADING
				state.me = null
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.status = Status.SUCCESS
				state.me = action.payload
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.status = Status.ERROR
				state.me = null
			})
	},
})

export const isAuthSelector = (state: RootState) => state.auth.data

export const {} = authSlice.actions

export default authSlice.reducer
