import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import EmptyPage from "../components/EmptyPage/EmptyPage";


function Orders() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://63da3f95b28a3148f682480b.mockapi.io/orders');
				setOrders(data);
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при запросе заказов");
				console.log(error);
			}
		})();
	}, []);

	const renderItems = (arr) => {
		return arr.map((item, i) => (
			<Card
				key={i}
				loading={isLoading}
				{...item}
			/>
		))
	};


	return (
		<div className="content h100p ">
			{
				orders.length > 0 ? (
					<>
						<div className="mb-40" >
							<h1>Мои покупки</h1>
						</div>

						<div className="mt-50">
							{
								isLoading ? (
									<div className="d-flex flex-wrap">
										{renderItems([...Array(12)])}
									</div>
								) : (
									orders.map((order) => {
										return (
											<div key={order.id}>
												<h2>Заказ № {`${order.id}`}</h2>
												<div className="order">
													{renderItems(order.items)}
												</div>
											</div>
										)
									})
								)
							}
						</div>
					</>
				) : (
					<EmptyPage
						img="img/no-orders.png"
						title="У вас нет заказов"
						descriptionOne="Вы нищеброд?"
						descriptionTwo=" Оформите хотя бы один заказ."
					/>
				)
			}

		</div >
	)
};

export default Orders;
