import React,{useState} from "react"
import "./index.less"
import classnames from "classnames"
import ReactDOM from "react-dom/client"
import { Formik, Form, ErrorMessage, Field } from "formik"
import ResourceLoader from "./ResourceLoader.js"
import { Spinner, SpinnerWithContainer, CenteredSpinner } from "./components/loading/spinners.js"
import { UsersTabs, UsersTable } from "./components/UsersTable"
import MenuLayout from "./components/MenuLayout"
import api from "./api.js"
const logoSVG = require("./assets/icons/logo-in8-dev.svg")
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const internCN = require("./assets/images/estagio.png")

function MobileMenu({toggleMenu, active}) {
	const iconCN = classnames('icon', {active});
	const mobileMenuCN = classnames('MobileMenu', {active})
	return (
		<div className={mobileMenuCN}>
			<div onClick={toggleMenu} className={iconCN}>
				<div className="stick"></div>
				<div className="stick"></div>
				<div className="stick"></div>
			</div>
			<div className="content" onClick={toggleMenu}>
				<MenuLayout/>
			</div>
		</div>
	)
}

function App() {
	const [active, setActive] = useState(false) //menu related
	const [refetch, setRefetch] = useState(false) //user refetch
	
	const refetchUsers = () => setRefetch(!refetch)
	const toggleMenu = (e) => setActive(!active)
	const backToTop = (e) => document.querySelector("#main").scrollIntoView({behavior: 'smooth'});
	const menuBackgroundCN = classnames('menuBackground', { active })
	return (
		<div className="App">
			<ToastContainer position="bottom-right"/>
			<div className={menuBackgroundCN} onClick={toggleMenu}></div>
			<div id="main" className="MainSec">
				<div className="container">
					<div className="header">
						<div className="mobileMenuContainer">
							<MobileMenu toggleMenu={toggleMenu} active={active}/>
						</div>
						<div className="logo"></div>
						<div className="desktopMenu">
							<MenuLayout/>
						</div>
					</div>
					<img src={internCN} alt="Imagem Estagio" className="intern"/>
				</div>
			</div>
			<div className="RegisterSec" id="register">
				<div className="container">
					<h1 className="text centered">CADASTRO</h1>
					<Formik 
						initialValues={{}}
						onSubmit={(values, { setSubmitting }) => {
							api.post('user', values).then(({data, status, response}) => {
								if (data.error) {
									return toast.error(data.error)
								}
								toast.success("Usuário cadastrado");
								refetchUsers();
								document.querySelector("#list").scrollIntoView({
									behavior: 'smooth'
								})
							}).finally(() => {
								setSubmitting(false)
							});
						}}
					>
						{({ isSubmitting, errors }) => {
							const loadingCN = classnames('SpinnerContainer', {show: isSubmitting});
							return (
								<div className="form formContainer">
									<div className={loadingCN}>
										<Spinner/>
										<div className="breakFlex"></div>
										<h3>Um momento...</h3>
									</div>
									<Form>
										<div className="formGroup">
											<label htmlFor="name">Nome</label>
											<Field className={'formField'} type="text" name="name" id="name"/>
										</div>
										<div className="formGroup">
											<label htmlFor="email">E-mail</label>
											<Field className={'formField'} type="email" name="email" id="email"/>
										</div>
										<div className="formGroup">
											<label htmlFor="birthday">Nascimento</label>
											<Field className={'formField'} type="date" name="birthday" id="birthday"/>
										</div>
										<div className="formGroup">
											<label htmlFor="phone">Telefone</label>
											<Field className={'formField'} type="tel" name="phone" id="phone"/>
										</div>
										<button type="submit" disabled={isSubmitting} className="solidButton registerButton">CADASTRAR</button>
									</Form>
								</div>
							)
						}}
					</Formik>
				</div>
			</div>
			<div className="UsersSec" id="list">
				<div className="container">
					<h1 className="text centered blue">LISTA DE CADASTRO</h1>
					<ResourceLoader refetch={refetch} uri="/users" resourceName="users">
						<UsersTabs/>
						<UsersTable/>
					</ResourceLoader>
					<div onClick={backToTop} className="backToTop"></div>
				</div>
			</div>
			<footer className="FooterSec" id="about">
				<address>
					Fulano Ciclano Beltrano Foo Bar <br/>
					<a href="mailto:fulano@company.com">fulano@company.com</a> <br/>
					<a href="tel:+5531999991010">(31) 9 9999 1010</a> <br/>
					Faculdade de Belo Horizonte
				</address>
			</footer>
		</div>
	)
}


const root = ReactDOM.createRoot(document.querySelector(".root"))

root.render(<App/>)