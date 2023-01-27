export interface IAuth {
	token: string
}

export interface AuthState {
	status: string
	data: IAuth | null
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
