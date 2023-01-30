import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { isAuthSelector } from '../../redux/slices/auth/authSlice'
import { fetchCards } from '../../redux/slices/cards/cardsSlice'
import { Status } from '../../redux/slices/cards/types'

import style from './CardsPage.module.scss'

const CardsPage: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const { cards, status } = useAppSelector(state => state.cards)

	useEffect(() => {
		dispatch(fetchCards())
	}, [])

	if (!isAuth) {
		navigate('/')
	}

	return (
		<div className={style.wrapper}>
			<div className={style.cardsBlock}>
				<h1 className={style.title}>My cards</h1>
				<div className={style.cards}>
					{cards &&
						cards.map(item => (
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
			{/* <div className={style.tagsBlock}>
				<h2 className={style.tagsTitle}>Tags</h2>
				<div className={style.tags}>
					<p className={style.tag}>#react</p>
					<p className={style.tag}>#frontend frontend</p>
					<p className={style.tag}>#english</p>
					<p className={style.tag}>#flipcards</p>
				</div>
			</div> */}
		</div>
	)
}

export default CardsPage
