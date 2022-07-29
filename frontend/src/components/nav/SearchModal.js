import React, { useRef, useState, useEffect } from "react";
import classes from "./SearchModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./../../images/logo.svg";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import {
	addToSearchHistory,
	deleteFromHistory,
	getSearchHistory,
	search,
} from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchModal({ setShowSearchModal }) {
	const { user } = useSelector((state) => ({ ...state }));
	const modal = useRef();
	const recentItem = useRef();
	useclickOutsideClose(modal, () => setShowSearchModal(false));

	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const [searchHistory, setSearchHistory] = useState([]);
	const [show, setShow] = useState(false);

	const searchHandler = async () => {
		if (searchTerm === "" || searchTerm === undefined) {
			setResults("");
			setShow(false);
		}
		const res = await search(searchTerm, user.token);
		console.log(res);
		if (res?.status === "success") {
			setResults(res.results);
			setShow(true);
		}
	};

	const addToSearchHistoryHandler = async (id) => {
		setShowSearchModal(false);
		await addToSearchHistory(id, user.token);
	};

	const getHistory = async () => {
		const res = await getSearchHistory(user.token);
		setSearchHistory(res.results);
	};

	const removeHandler = async (id) => {
		const res = await deleteFromHistory(id, user.token);
		if (res.status === "success") {
			recentItem.current.remove();
		}
	};

	useEffect(() => {
		getHistory();
	}, []);

	return (
		<div className={classes.modal} ref={modal}>
			<div className={classes.search}>
				<img src={logo} alt='Conversation of people' className={classes.logo} />
				<button className={classes.searchbar}>
					<input
						type='text'
						className={classes.searchInput}
						placeholder='Search friends...'
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyUp={searchHandler}
					/>
					<FontAwesomeIcon
						color='#575A89'
						icon={faMagnifyingGlass}
						className={classes.search_icon}
					></FontAwesomeIcon>
				</button>
			</div>
			<h3 className={classes.heading}>Recent searches</h3>
			{!show && (
				<div className={classes.search__recent}>
					{searchHistory &&
						searchHistory.length !== 0 &&
						searchHistory
							?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
							.map((result, i) => {
								return (
									<div
										className={classes.search__resultWrap}
										key={i}
										ref={recentItem}
									>
										<Link
											onClick={() => addToSearchHistoryHandler(result.user._id)}
											to={`/profile/${result?.user?.username}`}
											className={classes.search__result}
										>
											<img
												src={result?.user?.picture}
												alt='user profile picture'
												className={classes.search__img}
											/>
											<p className={classes.search__text}>
												{`${result?.user?.firstName} ${result?.user?.lastName}`}
											</p>
										</Link>
										<FontAwesomeIcon
											icon={faXmark}
											className={classes.search__recentIcon}
											onClick={() => removeHandler(result.user._id)}
										/>
									</div>
								);
							})}
				</div>
			)}
			{show && (
				<div className={classes.search__results}>
					{results &&
						results.map((result, i) => {
							return (
								<Link
									onClick={() => addToSearchHistoryHandler(result._id)}
									to={`/profile/${result.username}`}
									key={i}
									className={classes.search__result}
								>
									<img
										src={result.picture}
										alt='user profile picture'
										className={classes.search__img}
									/>
									<p className={classes.search__text}>
										{`${result.firstName} ${result.lastName}`}
									</p>
								</Link>
							);
						})}
				</div>
			)}
		</div>
	);
}
