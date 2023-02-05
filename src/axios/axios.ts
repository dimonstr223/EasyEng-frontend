import axios from 'axios'
import { IToken } from './../types/types'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'process.env.REACT_APP_API_URL',
})

const getLocalAccessToken = () => {
	const accessToken = localStorage.getItem('accessToken')
	return accessToken
}
const getLocalRefreshToken = () => {
	const refreshToken = localStorage.getItem('refreshToken')
	return refreshToken
}

const updateNewAccessToken = (token: string) => {
	let accessToken = getLocalAccessToken()
	accessToken = token
	localStorage.setItem('accessToken', accessToken)
}

instance.interceptors.request.use(
	config => {
		config.headers.Authorization = `Bearer ${getLocalAccessToken()}`
		config.headers.Logout = `Bearer ${getLocalRefreshToken()}`
		return config
	},
	error => Promise.reject(error)
)

instance.interceptors.response.use(
	res => res,
	async error => {
		const originalConfig = error.config
		if (error.response) {
			if (error.response.status === 403 && !originalConfig._retry) {
				originalConfig._retry = true
				try {
					const { data } = await instance.post<IToken>('/auth/token', {
						refreshToken: getLocalRefreshToken(),
					})
					const { accessToken } = data
					updateNewAccessToken(accessToken)
					return instance(originalConfig)
				} catch (_error) {
					return Promise.reject(_error)
				}
			}
		}
		return Promise.reject(error)
	}
)

export default instance
