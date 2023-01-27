export interface IAuth {
	token: string
}
export interface AuthState {
	status: string
	data: IAuth | null
}
