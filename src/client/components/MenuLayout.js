import React from "react"

export default function MenuLayout() {
	const scrollTo = (id) => (e) => {
		e.preventDefault();
		document.querySelector(`#${id}`).scrollIntoView({
			behavior: 'smooth'
		})
	}
	return (
		<nav>
			<ul>
				<li><a href="#" onClick={scrollTo('register')}>Cadastro</a></li>
				<li><a href="#" onClick={scrollTo('list')}>Lista</a></li>
				<li><a href="#" onClick={scrollTo('about')}>Sobre mim</a></li>
			</ul>
		</nav>
	);
}