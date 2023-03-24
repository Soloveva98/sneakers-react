import React, { useContext, useState } from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import s from "./Card.module.scss";


function Card({
	id,
	title,
	price,
	imageUrl,
	onFavorite,
	onPlus,
	favorited = false,
	loading = false
}) {

	const { isItemAdded, isItemFavorited, onRemoveFromFavorite } = useContext(AppContext);

	const obj = { id, parentId: id, title, imageUrl, price };

	const onClickPlus = () => {
		onPlus(obj);
	};

	const onClickFavorite = () => {
		onFavorite(obj)
	};


	return (
		<div className={s.card}>

			{
				loading ? (
					<>
						<ContentLoader
							speed={2}
							width={150}
							height={187}
							viewBox="0 0 150 187"
							backgroundColor="#f3f3f3"
							foregroundColor="#ecebeb"
						>
							<rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
							<rect x="0" y="105" rx="3" ry="3" width="150" height="15" />
							<rect x="0" y="125" rx="3" ry="3" width="93" height="15" />
							<rect x="0" y="162" rx="8" ry="8" width="80" height="24" />
							<rect x="118" y="153" rx="8" ry="8" width="32" height="32" />
						</ContentLoader>
					</>
				) : (
					<>
						<div className={s.favorite}>
							{
								favorited ? (
									<img onClick={() => onRemoveFromFavorite(obj.id)} className={s.favoriteRemove} src="img/close.svg" alt="remove" />
								) : (
									onFavorite && <img className={s.favoriteLike} onClick={onClickFavorite} src={isItemFavorited(id) ? "img/liked.svg" : "img/unliked.svg"} alt="unliked" />
								)
							}
						</div>

						<img className={s.card__img} src={imageUrl} alt="sneakers" />

						<h5>{title}</h5>

						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column">
								<span>Цена:</span>
								<b>{price} руб.</b>
							</div>
							{
								onPlus && (
									<img
										className={s.plus}
										onClick={onClickPlus}
										src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
										alt="plus"
									/>)
							}
						</div>
					</>
				)
			}
		</div>
	)
}

export default Card;