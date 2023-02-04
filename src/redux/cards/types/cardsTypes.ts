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
	currentPage: number
	limit: number
}

export interface ICardsState {
	status: Status
	totalCount: number
	cards: ICard[]
	imageURL: string
	card: ICard | null
	searchValue: string
	currentPage: number
	limit: number
}

export interface ISearchParams {
	keyWord: string
	page: number
}
