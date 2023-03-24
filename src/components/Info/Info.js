import React, { useContext } from 'react'
import s from "./Info.module.scss";
import AppContext from '../../context';

function Info({ title, image, description }) {

	const { setCartOpened } = useContext(AppContext);

	return (
		<div className={s.cartEmpty}>
			<img className={s.empty__img} src={image} alt="cart" />
			<h2 className='mb-10'>{title}</h2>
			<p>{description}</p>
			<button onClick={() => setCartOpened(false)} className="greenButton greenButton--left">
				<img src="img/arrow.svg" alt="arrow" />
				Вернуться назад
			</button>
		</div>
	)
}

export default Info;