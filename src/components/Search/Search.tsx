import React, { FC, useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import debounce from 'lodash.debounce'

import {
	fetchCards,
	fetchSearch,
} from '../../redux/cards/asyncThunks/cardsAsyncThunks'
import { setSearchValue } from '../../redux/cards/slices/cardsSlice'

import searchIcon from '../../assets/img/search-icon.svg'

import style from './Search.module.scss'

const Search: FC = () => {
	const dispatch = useAppDispatch()
	const { searchValue, currentPage } = useAppSelector(state => state.cards)

	const inputRef = useRef<HTMLInputElement>(null)

	const onSearchClick = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const search = useCallback(
		debounce(searchValue => {
			dispatch(fetchSearch({ keyWord: searchValue, page: currentPage }))
		}, 600),
		[]
	)

	useEffect(() => {
		if (!searchValue) {
			dispatch(fetchCards(currentPage))
		} else {
			search(searchValue)
		}
	}, [searchValue])

	const onSerachInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchValue(event.target.value))
	}

	return (
		<div className={style.search} onClick={onSearchClick}>
			<img className={style.searchIcon} src={searchIcon} alt='search' />
			<input
				className={style.serachInput}
				value={searchValue}
				onChange={onSerachInputHandler}
				type='text'
				ref={inputRef}
			/>
		</div>
	)
}

export default Search
