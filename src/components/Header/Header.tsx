import React from 'react'
import { Link } from 'react-router-dom'

import headerLogo from '../../assets/img/header-logo.svg'

import style from './Header.module.scss'

const Header: React.FC = () => {
	return (
		<header className={style.header}>
			<div className={style.logo}>
				<img src={headerLogo} width={60} alt='header logo' />
				<h3 className={style.title}>EasyLang</h3>
			</div>
			<div className={style.authButtons}>
				<Link to='/login' className={style.login}>
					Login
				</Link>
				<Link to='/register' className={style.register}>
					Create acc
				</Link>
			</div>
		</header>
	)
}

export default Header
