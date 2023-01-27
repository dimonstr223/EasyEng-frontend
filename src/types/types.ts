export interface IUser {
	username: string
	password: string
	roles: 'USER' | 'ADMIN'
}

export interface ICard {
	id: string
	word: string
	translation: string
	imageURL?: string
	user: IUser
}
