import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { unsavePost } from "../../functions/user";
import classes from "./SavedItem.module.scss";
import { useSelector } from "react-redux";
import { useRef } from "react";

export default function SavedItem({ post, setPosts }) {
	const { user } = useSelector((state) => ({ ...state }));
	const [image, setImage] = useState();
	const postRef = useRef();

	useEffect(() => {
		const photo =
			post?.photos && post.photos?.length !== 0 && post?.photos[0].url;
		const background = post.background && post.background;

		setImage(photo ? photo : background ? background : "");
	}, []);

	const clickHandler = async (e) => {
		e.preventDefault();
		const res = await unsavePost(post._id, user.id, user.token);

		if (res.status === "success") {
			postRef.current.remove();
		}
	};

	return (
		<Link
			to={`/profile/${post?.user?.username}`}
			className={classes.item}
			ref={postRef}
		>
			<div
				className={classes.item__img}
				style={{
					backgroundImage: `url(${image})`,
				}}
			></div>
			<div className={classes.item__info}>
				<h3 className={classes.item__title}>Post</h3>
				<div className={classes.item__user}>
					<img
						src={post?.user?.picture}
						alt='user picture'
						className={classes.item__picture}
					/>
					<p
						className={classes.item__from}
					>{`Saved from ${post?.user?.firstName} ${post?.user?.lastName}`}</p>
				</div>
				<button
					className={`${classes.item__btn} btn btn--purple`}
					onClick={clickHandler}
				>
					Unsave
				</button>
			</div>
		</Link>
	);
}
