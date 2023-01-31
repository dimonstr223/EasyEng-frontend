import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { FormData } from './types'

import logo from '../../assets/img/header-logo.svg'
import closeIcon from '../../assets/img/close-icon.svg'
import style from './RegisterPage.module.scss'

const RegisterPage: React.FC = () => {
	const addAvatarRef = useRef<HTMLInputElement>(null)

	const onAvatarClick = (event: React.MouseEvent) => {
		event.preventDefault()
		if (addAvatarRef.current) {
			addAvatarRef.current.click()
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: 'onBlur',
	})

	const onSubmit = handleSubmit(values => {
		console.log(values)
	})
	return (
		<div className={style.registerContainer}>
			<h1 className={style.title}>Registration</h1>
			<form className={style.form} onSubmit={onSubmit}>
				<div className={style.inputWrapper}>
					<label>Username</label>
					<input
						className={style.input}
						style={errors.username && { border: `3px solid #ff4e4e` }}
						type='text'
						{...register('username', { required: true, minLength: 3 })}
					/>
					{errors.username && <div className={style.error}>Enter username</div>}
				</div>
				<div className={style.inputWrapper}>
					<label>Password</label>
					<input
						className={style.input}
						style={errors.password && { border: `3px solid #ff4e4e` }}
						type='password'
						{...register('password', {
							required: true,
							minLength: 4,
							maxLength: 10,
						})}
					/>
					{errors.password && <div className={style.error}>Enter password</div>}
				</div>
				<div className={style.uploadAvatar}>
					<button className={style.uploadButton} onClick={onAvatarClick}>
						Add avatar
					</button>
					<input className={style.uploadInput} ref={addAvatarRef} type='file' />
					<div className={style.avatarWrapper}>
						<img className={style.image} src={logo} alt='Illustration' />
						<img className={style.removeButton} src={closeIcon} alt='remove' />
					</div>
				</div>
				<input
					className={style.submitButton}
					disabled={!isValid}
					type='submit'
					value='Sign up'
				/>
			</form>
		</div>
	)
}

export default RegisterPage
