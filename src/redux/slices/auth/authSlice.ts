import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { RootState } from '../../store'
import { AuthState, IAuth, IMe, Status } from './types'

export const fetchAuth = createAsyncThunk<IAuth, Form>(
	'auth/fethchAuth',
	async params => {
		const { data } = await axios.post('/auth/login', params)
		return data
	}
)

export const fetchMe = createAsyncThunk<IMe>('/auth/fetchMe', async () => {
	const { data } = await axios.get('/auth/me')
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
