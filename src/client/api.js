import axios from "axios"

const {hostname, protocol} = location;
const api = axios.create({
	baseURL: `${protocol}//${hostname}:3000/`
})

export default api