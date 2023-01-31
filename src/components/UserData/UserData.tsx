import React from 'react'

import avatarDefault from '../../assets/img/avatar-default.png'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { fetchUploadAva } from '../../redux/slices/auth/authSlice'

import style from './UserData.module.scss'

const UserData = () => {
	const dispatch = useAppDispatch()
	const { me, avatarURL } = useAppSelector(state => state.auth)

	const updateAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const formData = new FormData()
			const file = event.target.files[0]
			formData.append('avatar', file)
			dispatch(fetchUploadAva(formData))
		}
	}

	return (
		<div className={style.userData}>
			<label className={style.imageWrapper} htmlFor='upload'>
				<img
					src={me?.avatar ? `http://localhost:5555${me.avatar}` : avatarDefault}
					alt='Avatar'
				/>
			</label>
			<input
				className={style.up}
				id='upload'
				onChange={updateAvatarHandler}
				type='file'
			/>
			<h3 className={style.userName}>{me?.username}</h3>
		</div>
	)
}

export default UserData
