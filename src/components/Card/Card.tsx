import React from 'react'
import useAppSelector from '../../hooks/useAppSelector'

import style from './Card.module.scss'

interface ICardProps {
	word: string
	translation: string
	imageURL?: string
	_id: string
}

const Card: React.FC<ICardProps> = ({ word, translation, imageURL, _id }) => {
	const { cards } = useAppSelector(state => state.cards)
	const [flip, setFlip] = React.useState(false)

	return (
		<div
			className={style[`${flip ? 'flip' : 'card'}`]}
			onClick={() => setFlip(!flip)}
		>
			<div className={style.back}>
				<h3 className={style.translation}>{translation}</h3>
			</div>
			<div className={style.front}>
				<h3 className={style.word}>{word}</h3>
				{cards && cards.find(item => item._id === _id)?.imageURL && (
					<div className={style.imgWrapper}>
						<img src={imageURL} alt='Illustration' />
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
