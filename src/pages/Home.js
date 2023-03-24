import React from "react";
import Card from "../components/Card/Card";

function Home({ items, searchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading }) {

	const renderItems = () => {
		const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

		return (isLoading ? [...Array(12)] : filteredItems).map((item, i) => (
			<Card
				key={i}
				onFavorite={(obj) => onAddToFavorite(obj)}
				onPlus={(obj) => onAddToCart(obj)}
				loading={isLoading}
				{...item}
			/>
		))
	};

	return (
		<div className="content">
			<div className="intro">
				<img src="img/intro.png" />
			</div>

			<div className="title d-flex align-center justify-between mb-40">
				<h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
				<div className="search-block d-flex">
					<img src="img/search.svg" alt="search" />
					<input onChange={onChangeSearchInput} placeholder="Поиск..." />
				</div>
			</div>

			<div className="cards">
				{renderItems()}
			</div>
		</div>
	)
};

export default Home;