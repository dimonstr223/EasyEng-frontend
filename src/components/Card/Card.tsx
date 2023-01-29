import React from 'react'

import style from './Card.module.scss'

interface ICardProps {
	word: string
	translation: string
	imageURL?: string
}

const Card: React.FC<ICardProps> = ({ word, translation, imageURL }) => {
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
				<div className={style.imgWrapper}>
					<img src={imageURL} alt='Illustration' />
				</div>
			</div>
		</div>
	)
}

export default Card
