import React from "react"
// import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import "./index.less"
import "./components/loading/spinners.js"
import classnames from "classnames"
import ReactDOM from "react-dom/client"
import { Formik, Form, ErrorMessage, Field } from "formik"
import ResourceLoader from "./ResourceLoader.js"
import { Spinner, SpinnerWithContainer, CenteredSpinner } from "./components/loading/spinners.js"


const logoSVG = require("./assets/icons/logo-in8-dev.svg")
//const indexIMG = require("./assets/images/index-image.jpg")

function FormField({type="text", value, setState}) {
	return (
		<input type={type} value={value} onChange={(e) => setState(e.currentTarget.value)} />
	)
}


function UsersTable({users=[]}) {
	return users && users.length > 0 ? (
		<table className={"UsersTable"}>
			<thead>
				<tr>
					<th>Nome</th>
					<th>E-mail</th>
					<th>Nascimento</th>
					<th>Telefone</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => {
					return (
						<tr key={user.email}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.birthday}</td>
							<td>{user.phone}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	) : <CenteredSpinner color="blue"/>
}

function MenuLayout() {
	return (
		<nav>
			<ul>
				<li><a href="#cadastro">Cadastro</a></li>
				<li><a href="#lista">Lista</a></li>
				<li><a href="#sobre">Sobre mim</a></li>
			</ul>
		</nav>
	);
}

function App() {
	return (
		<div className="App">
			<div className="MainSec">
				<div className="container">
					<div className="header">
						<div className="logo">
							<img src={logoSVG}/>
						</div>
						<div className="desktopMenu">
							<MenuLayout/>
						</div>
						<div className="mobileMenu">
							<MenuLayout/>
						</div>
					</div>
				</div>
			</div>
			<div className="RegisterSec">
				<div className="container">
					<h1 className="text">CADASTRO</h1>
					<Formik 
						initialValues={{
							name: "Fulano", email: "fulano@g.c"
						}} 
						validate={(values) => {
							let errors = {};
							return errors
						}}
						onSubmit={(values, {setSubmitting}) => {
							console.log({values})
							setTimeout(() => {
								setSubmitting(false)
							}, 1000)
						}}
					>
						{({ isSubmitting }) => {
							const loadingCN = classnames('SpinnerContainer', {show: isSubmitting});
							return (
								<div className="formContainer">
									<div className={loadingCN}>
										<Spinner/>
										<div className="breakFlex"></div>
										<h3>Um momento...</h3>
									</div>
									<Form>
										<div className="formGroup">
											<label htmlFor="name">Nome</label>
											<ErrorMessage name="name" component="h1"/>
											<Field className="formField" type="text" name="name" id="name"/>
										</div>
										<div className="formGroup">
											<label htmlFor="email">E-mail</label>
											<ErrorMessage name="email" component="h1"/>
											<Field className="formField" type="email" name="email" id="email"/>
										</div>
										<div className="formGroup">
											<label htmlFor="birthday">Nascimento</label>
											<ErrorMessage name="birthday" component="h1"/>
											<Field className="formField" type="date" name="birthday" id="birthday"/>
										</div>
										<div className="formGroup">
											<label htmlFor="phone">Telefone</label>
											<ErrorMessage name="phone" component="h1"/>
											<Field className="formField" type="tel" name="phone" id="phone"/>
										</div>
										<button className="solidButton">CADASTRAR</button>
									</Form>
								</div>
							)
						}}
					</Formik>
				</div>
			</div>
			<div className="UsersSec">
				<div className="container">
					<h1>LISTA DE CADASTRO</h1>
					<ResourceLoader uri="/users" resourceName="users">
						<UsersTable/>
					</ResourceLoader>
				</div>
			</div>
		</div>
	)
}


const root = ReactDOM.createRoot(document.querySelector(".root"))

root.render(<App/>)