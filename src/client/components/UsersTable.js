import React, {useState, useEffect} from "react"
import {CenteredSpinner} from "./loading/spinners"
import classnames from "classnames"

export function UsersTabs({users=[]}) {
	const [user, setUser] = useState(users[0]);
	const handleTabClick = (user) => (e) => {
		setUser(user)
	}
	useEffect(() => {
		if (!user) setUser(users[0])
	}, [users])

	if (!user) 
		return null;

	return (
		<div className="UsersTabs">
			<header>
				<div className="tabs">
					{users.map((u, key) => {
						const tabCN = classnames('tab', {active: u.email === user.email})
						return <div onClick={handleTabClick(u)} className={tabCN} key={u.email+'tab'}>{key+1}</div>
					})}
				</div>
			</header>
			<div className="content">
				<div className="row"><div className="title">NOME</div>{user.name}</div>
				<div className="row"><div className="title">E-MAIL</div>{user.email}</div>
				<div className="row"><div className="title">DATA</div>{user.birthday}</div>
				<div className="row"><div className="title">TELEFONE</div>{user.phone}</div>
			</div>
		</div>
	)
}

export function UsersTable({ users=[], loading=true }) {
	return users && users.length > 0 ? (
		<table className={"UsersTable"}>
			<thead>
				<tr>
					<th></th>
					<th>Nome</th>
					<th>E-mail</th>
					<th>Nascimento</th>
					<th>Telefone</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, key) => {
					return (
						<tr key={user.email}>
							<td>{key+1}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.birthday}</td>
							<td>{user.phone}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	) : loading ? <CenteredSpinner color="blue"/> : null
}