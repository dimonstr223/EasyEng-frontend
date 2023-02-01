import { createSlice } from '@reduxjs/toolkit'

import { UsersState } from '../types/usersTypes'
import { Status } from '../../../types/types'

const initialState: UsersState = {
	status: Status.LOADING,
	users: [],
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {},
})

export default usersSlice.reducer
