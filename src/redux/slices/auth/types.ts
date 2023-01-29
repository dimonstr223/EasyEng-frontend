export interface IAuthResponse {
	accessToken: string
	refreshToken: string
}
export interface IMe {
	_id: string
	username: string
}
export interface AuthState {
	status: Status
	me: IMe | null
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}
