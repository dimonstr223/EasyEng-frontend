import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppSelector from '../../hooks/useAppSelector'

import editIcon from '../../assets/img/edit-icon.svg'
import deleteIcon from '../../assets/img/delete-icon.svg'

import style from './Card.module.scss'
import useAppDispatch from '../../hooks/useAppDispatch'
import { fetchDelete } from '../../redux/slices/cards/cardsSlice'

interface ICardProps {
	word: string
	translation: string
	imageURL?: string
	_id: string
}

const Card: React.FC<ICardProps> = ({ word, translation, imageURL, _id }) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [flip, setFlip] = React.useState(false)

	const onEditClick = (
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		navigate(`/edit-card/${_id}`)
	}

	const onDeleteClick = (
		event: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		event.stopPropagation()
		if (window.confirm('Are you shure delete card?')) {
			dispatch(fetchDelete(_id))
		}
	}
	// const { cards } = useAppSelector(state => state.cards)

	return (
		<div
			className={flip ? style.card + ' ' + style.flip : style.card}
			onClick={() => setFlip(!flip)}
			onMouseLeave={() => setFlip(false)}
		>
			{!flip && _id !== '0' && (
				<div className={style.buttons}>
					<img
						className={style.editButton}
						src={editIcon}
						alt='Edit'
						onClick={onEditClick}
					/>
					<img
						className={style.deleteButton}
						src={deleteIcon}
						onClick={onDeleteClick}
						alt='Delete'
					/>
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
