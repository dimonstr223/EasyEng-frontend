import { ICard } from './../../../types/types'

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
}

export interface ICardsResponse {
	totalCount: number
	cards: ICard[]
}

export interface ICardsState {
	status: Status
	totalCount: number
	cards: ICard[] | null
}
