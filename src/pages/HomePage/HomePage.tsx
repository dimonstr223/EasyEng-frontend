import React, { FC } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

import Card from '../../components/Card/Card'
import { isAuthSelector } from '../../redux/auth/slices/authSlice'

import arrow from '../../assets/img/arrow.svg'
import arrowTurn from '../../assets/img/arrow-turn.svg'
import birdImage from '../../assets/img/header-logo.svg'

import style from './HomePage.module.scss'

const HomePage: FC = () => {
	const isAuth = useAppSelector(isAuthSelector)

	if (isAuth) {
		return <Navigate to='/cards' />
	}

	return (
		<div className={style.homepage}>
			<h1 className={style.title}>Welcome</h1>

			<p className={style.text}>
				to <span>EasyLang</span>. This app will help you learn foreign words.
				Create your own flipcards and enjoy learning!
			</p>
			<div className={style.example}>
				<div className={style.wrapper}>
					<h2 className={style.clickTitle}>Click on the card!</h2>
					<img
						className={style.arrowImage}
						src={arrow}
						width={70}
						alt='arrow'
					/>
					<img
						className={style.arrowImageAdaptive}
						src={arrowTurn}
						width={70}
						alt='arrow'
					/>
				</div>
				<Card
					_id='0'
					word='Green bird'
					translation='Зеленая птица'
					imageURL={birdImage}
				/>
			</div>
			<Link to='/signup' className={style.getStartButton}>
				Get started
			</Link>
		</div>
	)
}

export default HomePage
