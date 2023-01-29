import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import arrow from '../../assets/img/arrow.svg'

import style from './HomePage.module.scss'
import Card from '../../components/Card/Card'

const HomePage: React.FC = () => {
	if (localStorage.getItem('token')) {
		return <Navigate to='/cards' />
	}
	return (
		<>
			<h1 className={style.title}>Welcome</h1>
			<p className={style.text}>
				to <span>EasyLang</span>. This app will help you learn foreign words.
				Create your own flipcards and enjoy learning!
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
				<Card />
			</div>
			<Link to='/register' className={style.getStartButton}>
				Get started
			</Link>
		</>
	)
}

export default HomePage
