import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks'
import debounce from 'lodash.debounce'

import {
	fetchCards,
	fetchSearch,
} from '../../redux/cards/asyncThunks/cardsAsyncThunks'

import style from './Search.module.scss'

const Search = () => {
	const dispatch = useAppDispatch()
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		if (searchValue === '') {
			dispatch(fetchCards())
		} else {
			dispatch(fetchSearch(searchValue))
		}
	}, [searchValue])

	const onSerachInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
	}

	return (
		<div className={style.search}>
			<input
				className={style.serachInput}
				value={searchValue}
				onChange={onSerachInputHandler}
				type='text'
			/>
		</div>
	)
}

export default Search
