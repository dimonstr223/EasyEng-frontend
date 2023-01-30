import React, { FC, useRef } from 'react'
import image from '../../assets/img/header-logo.svg'
import closeIcon from '../../assets/img/close-icon.svg'
import style from './CreateCardPage.module.scss'

const CreateCardPage: FC = () => {
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
					<input className={style.input} type='text' />
				</div>
				<div className={style.inputWrapper}>
					<label>Translation</label>
					<input className={style.input} type='text' />
				</div>
				<div className={style.addImage}>
					<button className={style.addImageButton} onClick={onClickAddImage}>
						Add image
					</button>
					<input
						className={style.addImageInput}
						ref={addImageRef}
						type='file'
					/>
					<div className={style.imgWrapper}>
						<img className={style.image} src={image} alt='Illustration' />
						<img className={style.removeButton} src={closeIcon} alt='remove' />
					</div>
				</div>
				<input className={style.submitButton} type='submit' value='Create' />
			</form>
		</div>
	)
}

export default CreateCardPage
