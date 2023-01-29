import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	users: {
		status: 'loading',
		items: [],
	},
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {},
})

export default usersSlice.reducer
