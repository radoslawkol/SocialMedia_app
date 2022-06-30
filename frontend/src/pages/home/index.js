import React from "react";
import classes from "./home.module.scss";
import Nav from "../../components/nav/Nav";
import SideMenu from "./SideMenu";
import FriendsProposal from "../../components/friends/FriendsProposal";
import CreatePost from "../../components/createPost/CreatePost";
import Activate from "./Activate";
import SendVerification from "./SendVerification";
import { useSelector } from "react-redux";
import Post from "../../components/post/Post";

export default function Home({ page, activate, posts }) {
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div className={classes.home}>
			<Nav page={page}></Nav>
			<main className={classes.home__main}>
				{activate && <Activate />}
				<FriendsProposal />
				{!user.verified && <SendVerification user={user} />}
				<CreatePost />
				{posts.map((post) => {
					return <Post key={post._id} post={post} />;
				})}
			</main>
			<SideMenu></SideMenu>
		</div>
	);
}
