import { Status } from './../auth/types'

export interface IUser {
	id: string
	username: string
	password: string
}

export interface UsersState {
	users: {
		status: Status.LOADING
		items: IUser[]
	}
}
