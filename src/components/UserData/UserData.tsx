import axios from '../../axios/axios'
import React, { FC } from 'react'

import avatarDefault from '../../assets/img/avatar-default.png'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchUpdateUser } from '../../redux/auth/asyncThunks/authAsyncThunks'

import style from './UserData.module.scss'
import convertBase64 from '../../utils/convertBase64'

const UserData: FC = () => {
	const dispatch = useAppDispatch()
	const { me } = useAppSelector(state => state.auth)

	const updateAvatarHandler = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			const file = event.target.files[0]
			const image = await convertBase64(file)
			await axios.post('/auth/upload', image).then(({ data }) => {
				if (me) {
					dispatch(
						fetchUpdateUser({
							id: me?._id,
							body: { avatar: data.url },
						})
					)
				}
			})
		}
	}

	return (
		<div className={style.userData}>
			<label className={style.imageWrapper} htmlFor='upload'>
				<img src={me?.avatar ? me.avatar : avatarDefault} alt='Avatar' />
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
