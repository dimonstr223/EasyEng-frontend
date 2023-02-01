import { Status } from '../../../types/types'

export interface IUser {
	id: string
	username: string
	password: string
}

export interface UsersState {
	status: Status
	users: IUser[]
}

export interface IUserParams {
	username?: string
	avatar?: string
}
