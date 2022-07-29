import React, { useState, useEffect } from "react";
import Post from "../../components/post/Post";
import classes from "./GridPost.module.scss";
import { GridLoader } from "react-spinners";

export default function GridPost({ posts, profile, setPosts, isVisitor }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (posts.length > 0) {
			setLoading(false);
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, []);

	if (loading) {
		return (
			<div className={classes.grid}>
				<GridLoader size={30} color='#8F00FF' />
			</div>
		);
	}
	if (!loading && posts && posts?.length > 0) {
		return posts?.map((post, i) => {
			return (
				<React.Fragment key={post._id}>
					<Post post={post} setPosts={setPosts} profile={profile}></Post>
				</React.Fragment>
			);
		});
	}
	if (!loading && posts?.length < 1) {
		return (
			<p className={classes.grid__message}>{`${
				isVisitor
					? "This user have not shared any post."
					: "You have not shared any post yet"
			}`}</p>
		);
	}
}
