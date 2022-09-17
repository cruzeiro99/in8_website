import api from "./api.js"
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"

export default function ResourceLoader({ children, resourceName, uri, refetch }) {
	const [data, setData] = useState();
	useEffect(() => {
		api.get(uri).then(({data}) => {
			if (data.error)
				return toast.error(data.error)
			setData(data);
		}).catch(err => console.error('ResourceLoader',err)); 
	}, [uri, refetch])
	return (
		<>
			{React.Children.map(children, child => {
				return React.cloneElement(child, { [resourceName]: data }, null)
			})}
		</>
	)
}