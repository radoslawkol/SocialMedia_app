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
import { InView, useInView } from "react-intersection-observer";

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
				console.log(data);
				dispatch({ type: "PROFILE_SUCCESS", payload: data });
			} else {
				navigate("/profile");
			}
		} catch (err) {
			console.log(err);
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

			dispatchPhotos({ type: "PHOTOS_SUCCESS", payload: data.resources });
		} catch (err) {
			dispatchPhotos({
				type: "PHOTOS_ERROR",
				payload: err.response.data.message,
			});
		}
	};

	console.log(profile);

	useEffect(() => {
		getPhotos();
	}, [username]);

	const [inView, setInView] = useState(false);

	const leftSideRef = useRef();
	const rightRef = useRef();

	const handleIntersectionChange = (inView, entry) => {
		console.log(entry);
		console.log(inView);
		if (inView) {
			leftSideRef.current.classList.add(`${classes.fixed}`);
			rightRef.current.classList.add(`${classes.scroll}`);
		} else {
			leftSideRef.current.classList.remove(`${classes.fixed}`);
			rightRef.current.classList.remove(`${classes.scroll}`);
		}
	};

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setPosts(profile.posts);
	}, [profile.posts]);

	return (
		<>
			<Nav page='profile'></Nav>
			<ProfileHeader profile={profile} isVisitor={isVisitor} photos={photos} />
			<main className={classes.profile}>
				<FriendsProposal />
				<InView
					threshold={0.0225}
					as='div'
					onChange={(inView, entry) => handleIntersectionChange(inView, entry)}
					className={classes.profile__container}
				>
					<div className={classes.profile__left} ref={leftSideRef}>
						<Intro
							fetchedDetails={profile?.user?.details}
							isVisitor={isVisitor}
							user={user}
						/>
						<Photos user={user} username={userName} photos={photos} />
						<Friends friends={profile?.user?.friends} />
					</div>
					<div className={classes.profile__right} ref={rightRef}>
						{!isVisitor && <CreatePost setPosts={setPosts} />}
						<GridPost posts={posts} profile={profile} />
					</div>
				</InView>
			</main>
		</>
	);
}
