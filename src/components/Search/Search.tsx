import React, { useState } from 'react'

import style from './Search.module.scss'

const Search = () => {
	const [searchValue, setSearchValue] = useState('')

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
