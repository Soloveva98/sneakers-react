import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../../context";

function Header({ onClickCart }) {

	const { cartItems } = useContext(AppContext);

	const [isOpenNav, setIsOpenNav] = useState(false);

	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);


	const onClickBurger = (event) => {
		return setIsOpenNav(!isOpenNav);
		/*if (isOpenNav) {
			return event.currentTarget.classList.add("active");
		} else if (!isOpenNav) {
			return event.currentTarget.classList.remove("active");
		}*/
	};


	return (
		<>
			<header className="d-flex justify-between align-center">
				<Link to="/">
					<div className={s.logo}>
						<img src="img/logo.png" alt="#" className="mr-15" />
						<div className={s.logo__info}>
							<h3 className="text-uppercase">React Sneakers</h3>
							<p>Магазин лучших кроссовок</p>
						</div>
					</div>
				</Link>

				<ul className={s.nav}>

					<li onClick={onClickCart} className="mr-30 d-flex cu-p">
						<img src="img/cart.svg" width={18} height={18} alt="Корзина" className="mr-15" />
						<span>{totalPrice} руб.</span>
					</li>

					<li className="mr-20 cu-p">
						<Link to="/favorites" className={s.icon}>
							<img src="img/heart.svg" width={18} height={18} alt="Закладки" className="mr-15" />
						</Link>
					</li>

					<li>
						<Link to="/orders" className={s.icon}>
							<img src="img/user.svg" width={18} height={18} className={s.icon} alt="Пользователь" />
						</Link>
					</li>

				</ul>

				<div onClick={onClickBurger} className={isOpenNav ? [s.burger__icon, s.active].join(' ') : [s.burger__icon]}>
					<span></span>
				</div>
			</header>

			<div className={isOpenNav ? [s.burger, s.active].join(' ') : [s.burger]}>
				<ul className={s.burger__inner}>
					<li onClick={onClickCart}>
						<img src="img/cart.svg" width={18} height={18} alt="Корзина" className="mr-15" />
						<span>{totalPrice} руб.</span>
					</li>

					<li>
						<Link to="/favorites" className={s.icon}>
							<img src="img/heart.svg" width={18} height={18} alt="Закладки" className="mr-15" />
							<span>Избранное</span>
						</Link>
					</li>

					<li>
						<Link to="/orders" className={s.icon}>
							<img src="img/user.svg" width={18} height={18} className="mr-15" alt="Пользователь" />
							<span>Заказы</span>
						</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Header;