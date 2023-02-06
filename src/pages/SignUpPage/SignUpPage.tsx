import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'

import { Form } from './types'
import { isAuthSelector, setAvatarURL } from '../../redux/auth/slices/authSlice'
import {
	fetchSingUp,
	fetchUploadAva,
} from '../../redux/auth/asyncThunks/authAsyncThunks'

import closeIcon from '../../assets/img/close-icon.svg'

import style from './SignUpPage.module.scss'
import convertBase64 from '../../utils/convertBase64'
import Compressor from 'compressorjs'

const RegisterPage: FC = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(isAuthSelector)
	const { avatarURL } = useAppSelector(state => state.auth)
	const navigate = useNavigate()

	const avatarUploadHandler = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const file = event.target.files[0]
			new Compressor(file, {
				maxHeight: 400,
				maxWidth: 400,
				success(result) {
					convertBase64(result).then(avatar => {
						dispatch(fetchUploadAva({ avatar }))
					})
				},
				error(error) {
					console.log(error.message)
				},
			})
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
						maxLength={15}
						{...register('username', {
							required: true,
							minLength: 3,
							maxLength: 15,
						})}
					/>
					{errors.username && <div className={style.error}>Enter username</div>}
				</div>
				<div className={style.inputWrapper}>
					<label>Password</label>
					<input
						className={style.input}
						style={errors.password && { border: `3px solid #ff4e4e` }}
						type='password'
						maxLength={15}
						{...register('password', {
							required: true,
							minLength: 4,
							maxLength: 15,
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
								src={avatarURL}
								// src={`http://localhost:5555${avatarURL}`}
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
