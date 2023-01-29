import React from 'react'
import { Link } from 'react-router-dom'

import headerLogo from '../../assets/img/header-logo.svg'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { fetchLogout } from '../../redux/slices/auth/authSlice'

import style from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<header className={style.header}>
			<Link to='/'>
				<div className={style.logo}>
					<img src={headerLogo} width={60} alt='header logo' />
					<h3 className={style.title}>EasyLang</h3>
				</div>
			</Link>
			<div className={style.authButtons}>
				{isAuth ? (
					<>
						<Link className={style.createCard} to={'/create-card'}>
							Create Card
						</Link>
						<button className={style.logout}>Log out</button>
					</>
				) : (
					<>
						<Link to='/login' className={style.login}>
							Log in
						</Link>
						<Link to='/register' className={style.register}>
							Create acc
						</Link>
					</>
				)}
			</div>
		</header>
	)
}

export default Header
