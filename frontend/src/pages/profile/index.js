import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./profile.module.scss";
import Nav from "../../components/nav/Nav";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import FriendsProposal from "../../components/friends/FriendsProposal";
import CreatePost from "../../components/createPost/CreatePost";
import Intro from "./Intro";
import GridPost from "./GridPost";
import Photos from "./Photos";
import Friends from "./Friends";
import { useInView } from "react-intersection-observer";

const profileReducer = (state, action) => {
	switch (action.type) {
		case "PROFILE_REQUEST":
			return { ...state, loading: true, error: "" };
		case "PROFILE_SUCCESS":
			return { ...state, loading: false, error: "", profile: action.payload };
		case "PROFILE_ERROR":
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

const photosReducer = (state, action) => {
	switch (action.type) {
		case "PHOTOS_REQUEST":
			return { ...state, loadingPhotos: true, errorPhotos: "" };
		case "PHOTOS_SUCCESS":
			return {
				...state,
				loadingPhotos: false,
				errorPhotos: "",
				photos: action.payload,
			};
		case "PHOTOS_ERROR":
			return {
				...state,
				loadingPhotos: false,
				errorPhotos: action.payload,
			};
		default:
			return state;
	}
};

const initialStatePhotos = {
	loadingPhotos: false,
	profile: {},
	errorPhotos: "",
};

export default function Profile() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => ({ ...state }));

	const [{ loading, error, profile }, dispatch] = useReducer(
		profileReducer,
		initialState
	);

	const { username } = useParams();
	let userName = username === undefined ? user.username : username;

	const isVisitor = userName === user.username ? false : true;

	const getProfile = async () => {
		try {
			dispatch({ type: "PROFILE_REQUEST" });
			const { data } = await axios.get(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/getProfile/${userName}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (data.status === "success") {
				dispatch({ type: "PROFILE_SUCCESS", payload: data });
				console.log(profile);
			} else {
				navigate("/profile");
			}
		} catch (err) {
			dispatch({ type: "PROFILE_ERROR", payload: err.response.data.message });
			navigate("/profile");
		}
	};

	useEffect(() => {
		getProfile();
	}, [username]);

	const [{ loadingPhotos, errorPhotos, photos }, dispatchPhotos] = useReducer(
		photosReducer,
		initialStatePhotos
	);

	const getPhotos = async () => {
		const path = `SocialMediaApp/SocialMediaApp/${userName}/*`;
		const sort = "desc";
		const max = 16;
		try {
			dispatchPhotos({ type: "PHOTOS_REQUEST" });
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

			dispatchPhotos({ type: "PHOTOS_SUCCESS", payload: data.resources });
		} catch (err) {
			dispatchPhotos({
				type: "PHOTOS_ERROR",
				payload: err.response.data.message,
			});
		}
	};

	useEffect(() => {
		getPhotos();
	}, [username]);

	// const [sectionMain, inView, entry] = useInView({
	// 	trackVisibility: true,
	// 	delay: 100,
	// 	threshold: 1.0,
	// });

	// useEffect(() => {
	// 	console.log(entry);
	// }, [inView]);

	return (
		<>
			<Nav page='profile'></Nav>
			<ProfileHeader profile={profile} isVisitor={isVisitor} photos={photos} />
			<main className={classes.profile}>
				<FriendsProposal />
				<div className={classes.profile__container}>
					<div
						className={classes.profile__left}
						style={{ position: `${inView ? "fixed" : ""}` }}
					>
						<Intro
							fetchedDetails={profile?.user?.details}
							isVisitor={isVisitor}
							user={user}
						/>
						<Photos user={user} username={userName} photos={photos} />
						<Friends />
					</div>
					<div className={classes.profile__right}>
						<CreatePost />
						<GridPost posts={profile?.posts} />
					</div>
				</div>
			</main>
		</>
	);
}
