import React from 'react'

import style from './RegisterPage.module.scss'

const RegisterPage = () => {
	return (
		<div className={style.registerContainer}>
			<h1 className={style.title}>Registration</h1>
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

export default RegisterPage
