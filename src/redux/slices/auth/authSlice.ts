import { createSlice } from '@reduxjs/toolkit'

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
