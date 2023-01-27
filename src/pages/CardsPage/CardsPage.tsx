import React from 'react'

import style from './CardsPage.module.scss'

const CardsPage: React.FC = () => {
	return (
		<div className={style.wrapper}>
			<div className={style.cardsBlock}>
				<div className={style.cardsBlockTop}>
					<h1 className={style.title}>My cards</h1>
					<button className={style.createButton}>Create card</button>
				</div>
				<div className={style.cards}></div>
			</div>
			<div className={style.tagsBlock}>
				<h2 className={style.tagsTitle}>Tags</h2>
				<div className={style.tags}>
					<p className={style.tag}>#react</p>
					<p className={style.tag}>#frontend frontend</p>
					<p className={style.tag}>#english</p>
					<p className={style.tag}>#flipcards</p>
				</div>
			</div>
		</div>
	)
}

export default CardsPage
