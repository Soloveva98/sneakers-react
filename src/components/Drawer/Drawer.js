import { useState, useContext } from 'react';
import axios from 'axios';
import Info from '../Info/Info';
import AppContext from "../../context";
import s from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {

	const { cartItems, setCartItems } = useContext(AppContext);

	const [orderId, setOrderId] = useState(null);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
	const nalog = Math.round(totalPrice * 0.05);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://63da3f95b28a3148f682480b.mockapi.io/orders', { items: cartItems });

			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);

			//в мокапи нет полного отчищения, поэтому только по одной сущности
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(`https://63cd326dfba6420d4d6a3b3c.mockapi.io/cart/${item.id}`);
				await delay(1000);
			}

		} catch (error) {
			alert("Ошибка при создании заказа :(")
		}
		setIsLoading(false);
	};

	return (
		<div className={`${s.overlay} ${opened ? s.overlayVisible : ''}`}>
			<div className={s.drawer}>
				<h2 className="mb-30 d-flex justify-between align-center">
					Корзина
					<img onClick={onClose} className={s.removeBtn} src="img/btn-remove.svg" alt="close" />
				</h2>

				{
					items.length > 0 ? (
						<>
							<div className={s.items}>
								{
									items.map((obj) => (
										<div key={obj.id} className={s.cartItem}>
											<div style={{ backgroundImage: `url(${obj.imageUrl})` }} className={s.cartItemImg}></div>
											<div className="mr-20 flex">
												<p className="mb-5">{obj.title}</p>
												<b>{obj.price} руб.</b>
											</div>
											<img onClick={() => onRemove(obj.id)} className={s.removeBtn} src="img/btn-remove.svg" alt="remove" />
										</div>
									))
								}
							</div>
							<div className={s.cartTotalBlock}>
								<ul>
									<li className="d-flex">
										<span>Итого: </span>
										<div></div>
										<b>{totalPrice} руб. </b>
									</li>
									<li className="d-flex">
										<span>Налог 5%: </span>
										<div></div>
										<b>{nalog} руб. </b>
									</li>
								</ul>
								<button disabled={isLoading} onClick={onClickOrder} className="greenButton greenButton--right">
									Оформить заказ
									<img src="img/arrow.svg" alt="arrow" />
								</button>
							</div>
						</>
					) : (
						<Info
							title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
							image={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
							description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
						/>
					)
				}

			</div>
		</div>
	)
}

export default Drawer;