import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import UserData from '../UserData/UserData'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { isAuthSelector } from '../../redux/auth/slices/authSlice'
import { fetchLogout } from '../../redux/auth/asyncThunks/authAsyncThunks'

import headerLogo from '../../assets/img/header-logo.svg'

import style from './Header.module.scss'

const Header: FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const navigate = useNavigate()

	const onLogoutClick = async () => {
		await dispatch(fetchLogout())
		navigate('/')
	}

	return (
		<header className={style.header}>
			<Link to='/'>
				<div className={style.logo}>
					<img src={headerLogo} width={60} alt='header logo' />
					<h3 className={style.title}>EasyLang</h3>
				</div>
			</Link>
			{isAuth && <UserData />}
			{isAuth ? (
				<div className={style.navButtons}>
					<Link className={style.createCard} to={'/create-card'}>
						New Card
					</Link>
					<button onClick={onLogoutClick} className={style.logout}>
						Log out
					</button>
				</div>
			) : (
				<div className={style.authButtons}>
					<Link to='/login' className={style.login}>
						Log in
					</Link>
					<Link to='/signup' className={style.register}>
						Sign up
					</Link>
				</div>
			)}
		</header>
	)
}

export default Header
