import React from "react";
import Nav from "../../components/nav/Nav";
import FriendsMenu from "./FriendsMenu";
import classes from "./friends.module.scss";
import { useEffect } from "react";
import { getFriendsInfos } from "../../functions/user";
import { useSelector } from "react-redux";
import FriendsContent from "./FriendsContent";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

const friendsReducer = (state, action) => {
	switch (action.type) {
		case "FRIENDS_REQUEST":
			return { ...state, loading: true, error: "" };
		case "FRIENDS_SUCCESS":
			return {
				...state,
				loading: false,
				error: "",
				data: action.payload,
			};
		case "FRIENDS_ERROR":
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

const initialState = {
	loading: false,
	data: {},
	error: "",
};

export default function Friends({ page }) {
	const { type } = useParams();
	const { user } = useSelector((state) => ({ ...state }));
	const [{ loading, error, data }, dispatch] = useReducer(
		friendsReducer,
		initialState
	);

	const getData = async () => {
		try {
			dispatch({ type: "FRIENDS_REQUEST" });
			const res = await getFriendsInfos(user.token);

			if (res.status === "success") {
				dispatch({ type: "FRIENDS_SUCCESS", payload: res.data });
			}
		} catch (err) {
			dispatch({ type: "FRIENDS_ERROR", payload: err.message });
		}
	};
	console.log(data);

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className={classes.friends}>
			<Nav page={page}></Nav>
			<div className={classes.friends__container}>
				<FriendsMenu />
				<FriendsContent
					data={data}
					getData={getData}
					type={type}
					loading={loading}
				/>
			</div>
		</div>
	);
}
