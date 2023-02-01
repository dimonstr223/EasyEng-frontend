import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks'

import { FormData } from './types'
import { isAuthSelector } from '../../redux/auth/slices/authSlice'

import style from './LoginPage.module.scss'
import { fetchLogin } from '../../redux/auth/asyncThunks/authAsyncThunks'

const LoginPage: FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: 'onBlur',
	})

	const onSubmit = handleSubmit(params => {
		dispatch(fetchLogin(params))
	})

	if (isAuth) {
		return <Navigate to='/cards' />
	}
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
						style={errors.password && { border: '3px solid #ff4e4e' }}
						type='password'
						{...register('password', {
							required: true,
							minLength: 4,
							maxLength: 10,
						})}
					/>
					{errors.password && <div className={style.error}>Enter password</div>}
				</div>
				<input
					disabled={!isValid}
					className={style.submitButton}
					type='submit'
					value='Submit'
				/>
			</form>
		</div>
	)
}

export default LoginPage
