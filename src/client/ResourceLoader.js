import api from "./api.js"
import React, { useEffect, useState } from 'react'

export default function ResourceLoader({ children, resourceName, uri }) {
	const [data, setData] = useState();
	useEffect(() => {
		api.get(uri).then(({data}) => {
			setData(data);
		}).catch(err => console.error('ResourceLoader',err)); 
	}, [uri])
	return (
		<>
			{React.Children.map(children, child => {
				return React.cloneElement(child, { [resourceName]: data }, null)
			})}
		</>
	)
}