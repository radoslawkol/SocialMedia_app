import React from "react";
import Post from "../../components/post/Post";
import classes from "./GridPost.module.scss";
export default function GridPost({ posts }) {
	return (
		<div className={classes.grid}>
			{posts?.map((post, i) => {
				return <Post post={post} key={post.id}></Post>;
			})}
		</div>
	);
}
