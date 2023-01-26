import React from 'react'

import image from '../../assets/img/header-logo.svg'

import style from './Card.module.scss'

const Card = () => {
	const [flip, setFlip] = React.useState(true)

	return (
		<div
			className={style[`${flip ? 'card' : 'flip'}`]}
			onClick={() => setFlip(!flip)}
		>
			<div className={style.back}>
				<h3 className={style.translation}>Зеленая птица</h3>
			</div>
			<div className={style.front}>
				<h3 className={style.word}>Green bird</h3>
				<div className={style.imgWrapper}>
					<img src={image} alt='' />
				</div>
			</div>
		</div>
	)
}

export default Card
