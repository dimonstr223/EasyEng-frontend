import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios/axios'

export const fetchAuth = createAsyncThunk('auth/fethchAuth', async params => {
	const { data } = await axios.post('/auth/login')
	console.log(data)
	return data
})

const initialState = {
	status: 'loading',
	data: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {},
})

export const {} = authSlice.actions

export default authSlice.reducer
