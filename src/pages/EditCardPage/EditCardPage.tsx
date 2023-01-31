import React, { FC, useRef, useState, useEffect } from 'react'
import closeIcon from '../../assets/img/close-icon.svg'
import useAppDispatch from '../../hooks/useAppDispatch'
import {
	fetchUpdate,
	fetchUpload,
	setImageURL,
} from '../../redux/slices/cards/cardsSlice'
import { useNavigate, useParams } from 'react-router-dom'

import style from './EditCardPage.module.scss'
import axios from '../../axios/axios'
import useAppSelector from '../../hooks/useAppSelector'

const EditCardPage: FC = () => {
	const dispatch = useAppDispatch()
	const { imageURL } = useAppSelector(state => state.cards)
	const navigate = useNavigate()
	const { id } = useParams()

	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')
	// const [image, setImage] = useState('')

	useEffect(() => {
		id &&
			axios.get(`/api/cards/${id}`).then(({ data }) => {
				setWord(data.word)
				setTranslation(data.translation)
				dispatch(setImageURL(data.imageURL))
			})
	}, [])

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)

			// await axios.post('/api/upload', formData).then(({ data }) => {
			// 	console.log(data)
			// 	dispatch(setImageURL(data.url))
			// })

			dispatch(fetchUpload(formData))
		}
	}

	const onSubmitClick = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		event.preventDefault()

		if (id) {
			dispatch(fetchUpdate({ id, body: { word, translation, imageURL } }))
		}
		navigate('/cards')
	}

	const onRemoveClick = () => {
		dispatch(setImageURL(''))
		// setImage('')
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
					value='Edit'
				/>
			</form>
		</div>
	)
}

export default EditCardPage
