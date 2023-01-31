import React, { FC, useRef, useState } from 'react'
import closeIcon from '../../assets/img/close-icon.svg'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
	fetchCreate,
	fetchUpload,
	removeImageURL,
} from '../../redux/slices/cards/cardsSlice'
import useAppSelector from '../../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'

import style from './EditCardPage.module.scss'

const EditCardPage: FC = () => {
	const dispatch = useAppDispatch()
	const { imageURL } = useAppSelector(state => state.cards)
	const navigate = useNavigate()

	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
			dispatch(fetchUpload(formData))
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
		dispatch(removeImageURL())
	}

	const addImageRef = useRef<HTMLInputElement>(null)

	const onClickAddImage = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		if (addImageRef.current) {
			addImageRef.current.click()
		}
	}

	return (
		<div className={style.editCard}>
			<h1 className={style.title}>Edit card</h1>
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
								src={`http://localhost:5555${imageURL}`}
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

export default EditCardPage
