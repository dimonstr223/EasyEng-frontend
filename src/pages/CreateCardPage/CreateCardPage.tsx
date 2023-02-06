import React, { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'

import {
	fetchCreate,
	fetchUpload,
} from '../../redux/cards/asyncThunks/cardsAsyncThunks'
import { setImageURL } from '../../redux/cards/slices/cardsSlice'

import closeIcon from '../../assets/img/close-icon.svg'

import style from './CreateCardPage.module.scss'
import convertBase64 from '../../utils/convertBase64'
import Compressor from 'compressorjs'
import { error } from 'console'

const CreateCardPage: FC = () => {
	const dispatch = useAppDispatch()
	const { imageURL } = useAppSelector(state => state.cards)
	const navigate = useNavigate()
	const addImageRef = useRef<HTMLInputElement>(null)

	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const file: File | Blob = event.target.files[0]
			new Compressor(file, {
				maxHeight: 400,
				maxWidth: 400,
				success(result) {
					convertBase64(result).then(image => {
						dispatch(fetchUpload({ image }))
					})
				},
				error(error) {
					console.log(error.message)
				},
			})
		}
	}

	const onSubmitClick = async (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		event.preventDefault()
		const params = { word, translation, imageURL }
		await dispatch(fetchCreate(params))
		navigate('/cards')
	}

	const onRemoveClick = () => {
		dispatch(setImageURL(''))
	}

	const onClickAddImage = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		if (addImageRef.current) {
			addImageRef.current.click()
		}
	}

	return (
		<div className={style.careateCard}>
			<h1 className={style.title}>Create card</h1>
			<form className={style.form}>
				<div className={style.inputWrapper}>
					<label>Foreign word</label>
					<input
						className={style.input}
						value={word}
						onChange={e => setWord(e.target.value)}
						type='text'
					/>
				</div>
				<div className={style.inputWrapper}>
					<label>Translation</label>
					<input
						className={style.input}
						value={translation}
						onChange={e => setTranslation(e.target.value)}
						type='text'
					/>
				</div>
				<div className={style.addImage}>
					<button className={style.addImageButton} onClick={onClickAddImage}>
						Add image
					</button>
					<input
						className={style.addImageInput}
						ref={addImageRef}
						onChange={handleImageUpload}
						type='file'
					/>
					{imageURL && (
						<div className={style.imgWrapper}>
							<img
								className={style.image}
								src={imageURL}
								// src={`http://localhost:5555${imageURL}`}
								alt='Illustration'
							/>
							<img
								className={style.removeButton}
								src={closeIcon}
								onClick={onRemoveClick}
								alt='remove'
							/>
						</div>
					)}
				</div>
				<input
					className={style.submitButton}
					onClick={onSubmitClick}
					type='submit'
					value='Create'
				/>
			</form>
		</div>
	)
}

export default CreateCardPage
