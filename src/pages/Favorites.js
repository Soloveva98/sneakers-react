import React, { useContext } from "react";
import Card from "../components/Card/Card";
import EmptyPage from "../components/EmptyPage/EmptyPage";
import AppContext from "../context";

function Favorites() {

	const { favorites } = useContext(AppContext);

	return (
		<div className="content">
			{
				favorites.length > 0 ? (
					<>
						<div className="mb-40">
							<h1>Мои закладки</h1>
						</div>

						<div className="favorites">
							{
								favorites.map((item, i) => (
									<Card
										key={i}
										favorited={true}
										{...item}
									/>
								))
							}
						</div>
					</>
				) : (
					<EmptyPage
						img="img/no-favorites.png"
						title="Закладок нет :("
						descriptionOne="Вы ничего не добавляли в закладки"
						descriptionTwo=""
					/>
				)
			}
		</div>
	)
};

export default Favorites;