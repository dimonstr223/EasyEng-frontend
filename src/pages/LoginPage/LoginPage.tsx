import React from 'react'

import style from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
	return (
		<div className={style.loginContainer}>
			<h1 className={style.title}>Login</h1>
			<form className={style.form}>
				<label>Username</label>
				<input className={style.input} type='text' />

				<label>Password</label>
				<input className={style.input} type='password' />
			</form>
			<button className={style.submitButton} type='submit'>
				Submit
			</button>
		</div>
	)
}

export default LoginPage
