import React from 'react'

import avatarDefault from '../../assets/img/avatar-default.png'

import style from './UserData.module.scss'

const UserData = () => {
	return (
		<div className={style.userData}>
			<div className={style.imageWrapper}>
				<img src={avatarDefault} alt='Avatar' />
			</div>
			<h3 className={style.userName}>userName</h3>
		</div>
	)
}

export default UserData
