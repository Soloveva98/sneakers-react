import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AppContext from "./context";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {

	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
					axios.get('https://63cd326dfba6420d4d6a3b3c.mockapi.io/cart'),
					axios.get('https://63da3f95b28a3148f682480b.mockapi.io/favorites'),
					axios.get('https://63cd326dfba6420d4d6a3b3c.mockapi.io/items')
				]);

				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("Ошибка при запросе данных :(");
				console.log(error);
			}
		}

		fetchData();
	}, []);

	//поиск товаров через инпут
	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	//работа с корзиной
	const onAddToCart = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://63cd326dfba6420d4d6a3b3c.mockapi.io/cart/${findItem.id}`);
			} else {
				setCartItems(prev => [...prev, obj]);
				const { data } = await axios.post('https://63cd326dfba6420d4d6a3b3c.mockapi.io/cart', obj);
				setCartItems((prev) => prev.map(item => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id
						}
					}
					return item;
				}));
			}
		} catch (error) {
			alert("Ошибка при добавлении в корзину");
			console.log(error);
		}
	};

	//удаление из корзины
	const onRemoveFromCart = (id) => {
		try {
			axios.delete(`https://63cd326dfba6420d4d6a3b3c.mockapi.io/cart/${id}`);
			setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
		} catch (error) {
			alert("Ошибка при удалении из корзины");
			console.log(error);
		}
	};

	//добавление в закладки
	const onAddToFavorite = async (obj) => {
		try {
			const findFavoriteItem = favorites.find((item) => Number(item.parentId) === Number(obj.id));
			if (findFavoriteItem) {
				setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://63da3f95b28a3148f682480b.mockapi.io/favorites/${findFavoriteItem.id}`);
			} else {
				setFavorites(prev => [...prev, obj]);
				const { data } = await axios.post('https://63da3f95b28a3148f682480b.mockapi.io/favorites', obj);
				setFavorites((prev) => prev.map(item => {
					if (item.parentId === data.parentId) {
						return {
							...item,
							id: data.id
						}
					}
					return item;
				}));
			}
		} catch (error) {
			alert("Ошибка при добавлении в закладки");
			console.log(error);
		}
	};

	//удаление из закладок
	const onRemoveFromFavorite = (id) => {
		try {
			axios.delete(`https://63da3f95b28a3148f682480b.mockapi.io/favorites/${id}`);
			setFavorites(prev => prev.filter(item => Number(item.id) !== Number(id)));
		} catch (error) {
			alert("Ошибка при удалении из закладок");
			console.log(error);
		}
	};

	//зеленая галочка
	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	//сердечко
	const isItemFavorited = (id) => {
		return favorites.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, isItemFavorited, onAddToCart, onAddToFavorite, onRemoveFromFavorite, setCartOpened, setCartItems }}>
			<div className="wrapper clear">

				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveFromCart}
					opened={cartOpened}
				/>

				<Header onClickCart={() => setCartOpened(true)} />

				<Routes>
					<Route path="/" element={
						<Home
							items={items}
							cartItems={cartItems}
							searchValue={searchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddToFavorite={onAddToFavorite}
							onAddToCart={onAddToCart}
							isLoading={isLoading}
						/>
					}
					/>
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>

			</div>
		</AppContext.Provider>
	);
}

export default App;