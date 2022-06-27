import React from "react";
import classes from "./home.module.scss";
import Nav from "../../components/nav/Nav";
import SideMenu from "./SideMenu";
import FriendsProposal from "../../components/friends/FriendsProposal";
import CreatePost from "../../components/createPost/CreatePost";

export default function Home({ page }) {
	return (
		<div className={classes.home}>
			<Nav page={page}></Nav>
			<main className={classes.home__main}>
				<FriendsProposal />
				<CreatePost />
			</main>
			<SideMenu></SideMenu>
		</div>
	);
}
