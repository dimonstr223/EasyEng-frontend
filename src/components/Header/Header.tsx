import React from 'react'

import headerLogo from '../../assets/img/header-logo.svg'

import style from './Header.module.scss'

const Header = () => {
	return (
		<header className={style.header}>
			<div className={style.logo}>
				<img src={headerLogo} width={60} alt='header logo' />
				<h3 className={style.title}>EasyEng</h3>
			</div>
			<div className={style.authButtons}>
				<button className={style.login}>Login</button>
				<button className={style.register}>Register</button>
			</div>
		</header>
	)
}

export default Header
