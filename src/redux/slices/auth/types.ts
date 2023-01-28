export interface IAuth {
	token: string
}

export interface AuthState {
	status: string
	data: IAuth | null
	me: IMe | null
}

export interface IMe {
	_id: string
	username: string
	password: string
	roles: string[]
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
