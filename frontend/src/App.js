import React, { useEffect, useReducer, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Profile from "./pages/profile";
import Friends from "./pages/friends";
import Reset from "./pages/reset";
import axios from "axios";
import { useSelector } from "react-redux";
import Chat from "./pages/chat";
import Saved from "./pages/saved";

const postReducer = (state, action) => {
	switch (action.type) {
		case "POSTS_REQUEST":
			return { ...state, loading: true, error: "" };
		case "POSTS_SUCCESS":
			return { ...state, loading: false, error: "", posts: action.payload };
		case "POSTS_ERROR":
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
	error: "",
	posts: [],
};

function App() {
	const { user } = useSelector((state) => ({ ...state }));
	const { theme } = useSelector((state) => ({ ...state }));
	const modalRoot = document.getElementById("modal-root");

	if (theme) {
		modalRoot.classList.add("dark");
	} else {
		modalRoot.classList.remove("dark");
	}

	const [{ loading, error, posts }, dispatch] = useReducer(
		postReducer,
		initialState
	);

	const getAllPosts = async () => {
		try {
			if (user) {
				dispatch({ type: "POSTS_REQUEST" });
				const { data } = await axios.get(
					`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				dispatch({ type: "POSTS_SUCCESS", payload: data.posts });
			}
		} catch (err) {
			dispatch({ type: "POSTS_ERROR", payload: err.response.data.message });
		}
	};

	useEffect(() => {
		getAllPosts();
	}, [initialState.posts, user]);

	return (
		<div className={`${theme ? "dark" : ""}`}>
			<Router>
				<Routes>
					<Route element={<LoggedInRoutes></LoggedInRoutes>}>
						<Route
							path='/'
							element={<Home page='home' fetchedPosts={posts} />}
						></Route>
						<Route path='/profile' element={<Profile />}></Route>
						<Route path='/profile/:username' element={<Profile />}></Route>
						<Route path='/friends' element={<Friends page='friends' />}></Route>
						<Route
							path='/friends/:type'
							element={<Friends page='friends' />}
						></Route>
						<Route path='/saved' element={<Saved />}></Route>
						<Route
							path='/activate/:token'
							element={<Home activate={true} />}
						></Route>
						<Route path='/chat' element={<Chat />}></Route>
					</Route>
					<Route>
						<Route element={<NotLoggedInRoutes />}>
							<Route path='/login' element={<Login />}></Route>
						</Route>
					</Route>
					<Route path='/reset' element={<Reset />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
