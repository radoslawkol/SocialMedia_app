import React, { useEffect, useState } from "react";
import classes from "./saved.module.scss";
import Nav from "../../components/nav/Nav";
import { getSavedPosts } from "../../functions/user";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

import SavedItem from "./SavedItem";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default function Saved() {
	const { user } = useSelector((state) => ({ ...state }));
	const [posts, setPosts] = useState();
	const getData = async () => {
		const res = await getSavedPosts(user.id, user.token);

		console.log(res);
		if (res.status === "success") {
			setPosts(res.saved.savedPosts);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className={classes.saved}>
			<Nav />
			<main className={classes.saved__main}>
				<h2 className={classes.saved__heading}>Saved Posts</h2>
				<section className={classes.saved__container}>
					{posts ? (
						posts
							?.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
							.map((post, i) => {
								return (
									<SavedItem post={post.post} key={i} setPosts={setPosts} />
								);
							})
					) : (
						<PulseLoader color='8F00FF' />
					)}
				</section>
			</main>
		</div>
	);
}
