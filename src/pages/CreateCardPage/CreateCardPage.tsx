import React, { FC, useRef, useState } from 'react'
import image from '../../assets/img/header-logo.svg'
import closeIcon from '../../assets/img/close-icon.svg'
import style from './CreateCardPage.module.scss'
import useAppDispatch from '../../hooks/useAppDispatch'

const CreateCardPage: FC = () => {
	const dispatch = useAppDispatch()
	// interface IValues {
	// 	word: string
	// 	translation: string
	// 	imageURL: string
	// }
	// const [{ word, translation, imageURL }, setValues] = useState<IValues>({
	// 	word: '',
	// 	translation: '',
	// 	imageURL: '',
	// })
	const [word, setWord] = useState('')
	const [translation, setTranslation] = useState('')
	const [imageURL, setImgaeURL] = useState('')

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('image', file)
		}
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
							<img className={style.image} src={image} alt='Illustration' />
							<img
								className={style.removeButton}
								src={closeIcon}
								alt='remove'
							/>
						</div>
					)}
				</div>
				<input className={style.submitButton} type='submit' value='Create' />
			</form>
		</div>
	)
}

export default CreateCardPage
