import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { Status } from '../../types/types'
import { fetchCards } from '../../redux/cards/asyncThunks/cardsAsyncThunks'
import { isAuthSelector } from '../../redux/auth/slices/authSlice'

import Card from '../../components/Card/Card'
import CardSkeleton from '../../components/Card/CardSkeleton'
import Search from '../../components/Search/Search'

import style from './CardsPage.module.scss'

const CardsPage: FC = () => {
	// const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const { cards, status } = useAppSelector(state => state.cards)
	const navigate = useNavigate()

	const loading = status === Status.LOADING

	// useEffect(() => {
	// 	dispatch(fetchCards()) <- SAME DISPATCH IN SEARCH COMPONENT
	// }, [])

	if (!isAuth) {
		navigate('/')
	}

	return (
		<div className={style.wrapper}>
			<div className={style.cardsBlock}>
				<div className={style.topWrapper}>
					<h1 className={style.title}>My cards</h1>
					<Search />
				</div>
				<div className={style.cards}>
					{loading
						? [...new Array(8)].map((_, index) => <CardSkeleton />)
						: cards.map(item => (
								<Card
									key={item._id}
									word={item.word}
									translation={item.translation}
									imageURL={item?.imageURL}
									_id={item._id}
								/>
						  ))}
				</div>
			</div>
		</div>
	)
}

export default CardsPage
