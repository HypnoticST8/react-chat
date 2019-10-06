import axios from 'axios'

const axiosChat = axios.create({
	baseURL: 'http://127.0.0.1:8000',
})

export default axiosChat