import React from 'react'

import image from '../../assets/img/header-logo.svg'
import arrow from '../../assets/img/arrow.svg'

import style from './HomePage.module.scss'

const HomePage = () => {
	return (
		<>
			<h1 className={style.title}>Welcome</h1>
			<p className={style.text}>
				to <span>EasyEng</span>. This app will help you learn English words.
				Create your own translation cards and enjoy learning!
			</p>
			<div className={style.example}>
				<div className={style.wrapper}>
					<h2>Click on the card!</h2>
					<img
						className={style.arrowImage}
						src={arrow}
						width={70}
						alt='arrow'
					/>
				</div>
				<div className={style.card}>
					<h3 className={style.cardTitle}>Green bird</h3>
					<div className={style.imgWrapper}>
						<img src={image} width={150} alt='' />
					</div>
				</div>
			</div>
			<button className={style.getStartButton}>Get started</button>
		</>
	)
}

export default HomePage
