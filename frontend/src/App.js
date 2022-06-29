import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Login from "./pages/login/index";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Profile from "./pages/profile";
import Friends from "./pages/friends";
import Reset from "./pages/reset";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<LoggedInRoutes></LoggedInRoutes>}>
					<Route path='/' element={<Home page='home' />}></Route>
					<Route path='/profile' element={<Profile />}></Route>
					<Route path='/friends' element={<Friends page='friends' />}></Route>
					<Route
						path='/activate/:token'
						element={<Home activate={true} />}
					></Route>
				</Route>
				<Route>
					<Route element={<NotLoggedInRoutes />}>
						<Route path='/login' element={<Login />}></Route>
					</Route>
				</Route>
				<Route path='/reset' element={<Reset />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
