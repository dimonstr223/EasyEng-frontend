import React from 'react'

import emptyIcon from '../../assets/img/empty-icon.svg'

import style from './Empty.module.scss'

const Empty = () => {
	return (
		<div className={style.empty}>
			<img className={style.emptyImage} src={emptyIcon} alt='empty' />
		</div>
	)
}

export default Empty
