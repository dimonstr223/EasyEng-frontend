import React from 'react'

import image from '../../assets/img/header-logo.svg'

import style from './Card.module.scss'

const Card = () => {
	return (
		<div className={style.card}>
			<h3 className={style.cardTitle}>Green bird</h3>
			<div className={style.imgWrapper}>
				<img src={image} width={150} alt='' />
			</div>
		</div>
	)
}

export default Card
