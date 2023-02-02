import React from 'react'

import style from './Search.module.scss'

const Search = () => {
	return (
		<div className={style.search}>
			<input className={style.serachInput} type='text' />
		</div>
	)
}

export default Search
