import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import ReactPaginate from 'react-paginate'

import { IPage } from './CardPageTypes'
import { Status } from '../../types/types'
import {
	fetchCards,
	fetchSearch,
} from '../../redux/cards/asyncThunks/cardsAsyncThunks'
import { isAuthSelector } from '../../redux/auth/slices/authSlice'

import Card from '../../components/Card/Card'
import CardSkeleton from '../../components/Card/CardSkeleton'
import Search from '../../components/Search/Search'

import style from './CardsPage.module.scss'

const CardsPage: FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const { cards, totalCount, searchValue, limit, currentPage, status } =
		useAppSelector(state => state.cards)
	const navigate = useNavigate()

	const loading = status === Status.LOADING

	const hadleClickPage = async (page: IPage) => {
		let pageNumber = page.selected + 1
		if (!searchValue) {
			dispatch(fetchCards(pageNumber))
		} else {
			dispatch(fetchSearch({ keyWord: searchValue, page: pageNumber }))
		}
	}
	const pageCount = Math.ceil(totalCount / limit)

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
						? [...new Array(8)].map((_, index) => <CardSkeleton key={index} />)
						: cards?.map(item => (
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
			{cards ? (
				<ReactPaginate
					pageCount={pageCount}
					previousLabel={'<'}
					nextLabel={'>'}
					breakLabel='...'
					marginPagesDisplayed={1}
					pageRangeDisplayed={2}
					onPageChange={hadleClickPage}
					forcePage={currentPage - 1}
					renderOnZeroPageCount={() => null}
					//STYLES
					containerClassName={style.pagination}
					pageLinkClassName={style.pageLink}
					previousLinkClassName={style.pageLink}
					nextLinkClassName={style.pageLink}
					activeLinkClassName={style.active}
				/>
			) : (
				<div>NOT FOUND</div>
			)}
		</div>
	)
}

export default CardsPage
