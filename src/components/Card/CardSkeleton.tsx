import React from 'react'
import ContentLoader from 'react-content-loader'

const CardSkeleton = () => (
	<ContentLoader
		speed={1}
		width={300}
		height={400}
		viewBox='0 0 300 400'
		backgroundColor='#012712'
		foregroundColor='#003819'
		// {...props}
	>
		<rect x='0' y='0' rx='20' ry='20' width='300' height='400' />
	</ContentLoader>
)

export default CardSkeleton
