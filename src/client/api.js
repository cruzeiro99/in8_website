import axios from "axios"

const {hostname, protocol} = location;
const api = axios.create({
	baseURL: `${protocol}//${hostname}/`
})

export default api