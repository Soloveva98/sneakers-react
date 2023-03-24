import React from "react";
import { Link } from "react-router-dom";
import s from "./EmptyPage.module.scss";

function EmptyPage({ img, title, descriptionOne, descriptionTwo }) {
	return (
		<div className={s.emptyPage}>
			<img className={s.emptyPage__img} src={img} alt="smiley" />
			<h1>{title}</h1>
			<p>{descriptionOne}</p>
			<p>{descriptionTwo}</p>
			<Link to="/">
				<button className="greenButton greenButton--left">
					<img src="img/arrow.svg" alt="arrow" />
					Вернуться назад
				</button>
			</Link>
		</div>
	)
};

export default EmptyPage;