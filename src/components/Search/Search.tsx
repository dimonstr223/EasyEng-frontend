import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../hooks'
import debounce from 'lodash.debounce'

import {
	fetchCards,
	fetchSearch,
} from '../../redux/cards/asyncThunks/cardsAsyncThunks'

import searchIcon from '../../assets/img/search-icon.svg'

import style from './Search.module.scss'

const Search: FC = () => {
	const dispatch = useAppDispatch()
	const [searchValue, setSearchValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	const onSearchClick = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	const testDebounce = useCallback(
		debounce(searchValue => {
			dispatch(fetchSearch(searchValue))
		}, 600),
		[]
	)

	useEffect(() => {
		if (!searchValue) {
			dispatch(fetchCards())
		} else {
			testDebounce(searchValue)
		}
	}, [searchValue])

	const onSerachInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
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
