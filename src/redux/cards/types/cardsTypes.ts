import { ICard } from '../../../types/types'

export interface ICardParams {
	word: string
	translation: string
	imageURL?: string
}

export interface IUpdateParams {
	id: string
	body: ICardParams
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export interface ICardsResponse {
	totalCount: number
	items: ICard[]
}

export interface ICardsState {
	status: Status
	totalCount: number
	cards: ICard[] | []
	imageURL: string
	card: ICard | null
}
