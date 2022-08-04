import React from "react"
import "./loading.less"

export function Spinner({color='white'}) {
	return <div className={`Spinner ${color}`}></div>
}

export const SpinnerWithContainer = (spinner, props) => () => {
	const Spinner = React.cloneElement(spinner, props);
	return (
		<div className="SpinnerContainer">
			<Spinner/>
		</div>
	)
}

export const CenteredSpinner = (props) => {
	return (
		<div className="CenteredSpinner">
			<Spinner {...props}/>
		</div>
	)
}