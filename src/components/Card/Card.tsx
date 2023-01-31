import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppSelector from '../../hooks/useAppSelector'

import editIcon from '../../assets/img/edit-icon.svg'
import deleteIcon from '../../assets/img/delete-icon.svg'

import style from './Card.module.scss'

interface ICardProps {
	word: string
	translation: string
	imageURL?: string
	_id: string
}

const Card: React.FC<ICardProps> = ({ word, translation, imageURL, _id }) => {
	const navigate = useNavigate()
	const onEditClick = (
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		event.preventDefault()
		navigate('/edit-card')
	}
	// const { cards } = useAppSelector(state => state.cards)
	const [flip, setFlip] = React.useState(false)

	return (
		<div
			className={flip ? style.card + ' ' + style.flip : style.card}
			onClick={() => setFlip(!flip)}
			onMouseLeave={() => setFlip(false)}
		>
			{!flip && (
				<div className={style.buttons}>
					<img
						className={style.editButton}
						src={editIcon}
						alt='Edit'
						onClick={onEditClick}
					/>
					<img className={style.deleteButton} src={deleteIcon} alt='Delete' />
				</div>
			)}
			<div className={style.back}>
				<h3 className={style.translation}>{translation}</h3>
			</div>
			<div className={style.front}>
				<h3 className={style.word}>{word}</h3>
				{imageURL && (
					<div className={style.imgWrapper}>
						<img
							src={_id === '0' ? imageURL : `http://localhost:5555${imageURL}`}
							alt='Illustration'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
