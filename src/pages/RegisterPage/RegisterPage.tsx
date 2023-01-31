import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from './types'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import {
	fetchSingUp,
	fetchUploadAva,
	isAuthSelector,
	setAvatarURL,
} from '../../redux/slices/auth/authSlice'

import closeIcon from '../../assets/img/close-icon.svg'
import style from './RegisterPage.module.scss'
import { useNavigate } from 'react-router-dom'

const RegisterPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const { avatarURL } = useAppSelector(state => state.auth)
	const navigate = useNavigate()

	const avatarUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('avatar', file)
			dispatch(fetchUploadAva(formData))
		}
	}

	const onCloseClick = () => {
		dispatch(setAvatarURL(''))
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<Form>({
		mode: 'onBlur',
	})

	const onSubmit = handleSubmit(values => {
		const params = { ...values, avatar: avatarURL }
		dispatch(fetchSingUp(params))
		reset()
		dispatch(setAvatarURL(''))
	})

	if (isAuth) {
		navigate('/cards')
	}
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
					<label className={style.uploadButton} htmlFor='uploadInput'>
						Add Avatar
					</label>
					<input
						className={style.uploadInput}
						id='uploadInput'
						type='file'
						{...register('avatar', {
							onChange: avatarUploadHandler,
						})}
					/>
					{avatarURL && (
						<div className={style.avatarWrapper}>
							<img
								className={style.image}
								src={`http://localhost:5555${avatarURL}`}
								alt='Illustration'
							/>
							<img
								className={style.removeButton}
								src={closeIcon}
								alt='remove'
								onClick={onCloseClick}
							/>
						</div>
					)}
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
