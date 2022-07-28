import React from "react";
import Post from "../../components/post/Post";
import classes from "./GridPost.module.scss";
import { GridLoader } from "react-spinners";

export default function GridPost({ posts, profile, setPosts }) {
	return (
		<div className={classes.grid}>
			{posts?.length === 0 ? (
				<GridLoader size={30} color='#8F00FF' />
			) : (
				posts?.map((post, i) => {
					return (
						<Post
							post={post}
							key={post.id}
							setPosts={setPosts}
							profile={profile}
						></Post>
					);
				})
			)}
		</div>
	);
}
