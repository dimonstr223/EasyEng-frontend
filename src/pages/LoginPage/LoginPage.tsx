import React from 'react'
import { useForm } from 'react-hook-form'

import { FormData } from './types'

import style from './LoginPage.module.scss'
import useAppDispatch from '../../hooks/useAppDispatch'
import { fetchAuth, isAuthSelector } from '../../redux/slices/auth/authSlice'
import useAppSelector from '../../hooks/useAppSelector'
import { Navigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>()

	const onSubmit = handleSubmit(async values => {
		const data: any = await dispatch(fetchAuth(values))
		if (!data.payload) {
			return alert('Authorization error')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
	})

	if (isAuth) return <Navigate to='/cards' />

	return (
		<div className={style.loginContainer}>
			<h1 className={style.title}>Log in</h1>
			<form className={style.form} onSubmit={onSubmit}>
				<div className={style.inputWrapper}>
					<label>Username</label>
					<input
						className={style.input}
						style={errors.username && { border: '3px solid #ff4e4e' }}
						type='text'
						{...register('username', {
							required: true,
							minLength: 3,
						})}
					/>
					{errors.username && <div className={style.error}>Enter username</div>}
				</div>
				<div className={style.inputWrapper}>
					<label>Password</label>
					<input
						className={style.input}
						style={errors.username && { border: '3px solid #ff4e4e' }}
						type='password'
						{...register('password', {
							required: true,
							minLength: 4,
							maxLength: 10,
						})}
					/>
					{errors.password && <div className={style.error}>Enter password</div>}
				</div>
				<input className={style.submitButton} type='submit' value='Submit' />
			</form>
		</div>
	)
}

export default LoginPage
