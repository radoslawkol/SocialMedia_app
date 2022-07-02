import React, { useReducer, useEffect } from "react";
import classes from "./Photos.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const photosReducer = (state, action) => {
	switch (action.type) {
		case "PHOTOS_REQUEST":
			return { ...state, loading: true, error: "" };
		case "PHOTOS_SUCCESS":
			return { ...state, loading: false, error: "", photos: action.payload };
		case "PHOTOS_ERROR":
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
	profile: {},
	error: "",
};

export default function Photos({ user }) {
	const navigate = useNavigate();
	const [{ loading, error, photos }, dispatch] = useReducer(
		photosReducer,
		initialState
	);

	const getPhotos = async () => {
		const path = `SocialMediaApp/SocialMediaApp/${user.username}/*`;
		const sort = "desc";
		const max = 9;
		try {
			dispatch({ type: "PHOTOS_REQUEST" });
			const { data } = await axios.post(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/images/listImages`,
				{
					path,
					sort,
					max,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			console.log(data);

			dispatch({ type: "PHOTOS_SUCCESS", payload: data.resources });
		} catch (err) {
			dispatch({ type: "PHOTOS_ERROR", payload: err.response.data.message });
		}
	};

	useEffect(() => {
		getPhotos();
	}, [user.username]);

	console.log(photos);

	return (
		<div className={classes.photos}>
			<h2 className={classes.photos__heading}>Photos</h2>
			{photos && photos.length !== 0 && (
				<div className={classes.photos__list}>
					{photos?.slice(0, 9).map((photo, i) => {
						return (
							<img
								src={photo?.secure_url}
								alt="user's photo"
								key={i}
								className={classes.photos__photo}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
