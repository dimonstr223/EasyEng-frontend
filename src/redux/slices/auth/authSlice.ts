import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

import { FormData as Form } from '../../../pages/LoginPage/types'
import { AuthState, IAuth, Status } from './types'

export const fetchAuth = createAsyncThunk<IAuth, Form>(
	'auth/fethchAuth',
	async params => {
		const { data } = await axios.post('/auth/login', params)
		console.log(data)
		return data
	}
)

const initialState: AuthState = {
	status: Status.LOADING,
	data: null,
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
			})
			.addCase(fetchAuth.rejected, state => {
				state.status = Status.ERROR
				state.data = null
			})
	},
})

export const {} = authSlice.actions

export default authSlice.reducer
