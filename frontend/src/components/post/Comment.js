import React from "react";
import classes from "./Comment.module.scss";
import Moment from "react-moment";

export default function Comment({ comment }) {
	return (
		<div className={classes.comment}>
			<div className={classes.comment__header}>
				<img
					src={comment?.commentedBy?.picture}
					alt='user image'
					className={classes.comment__user}
				/>
				<div className={classes.comment__content}>
					<span className={classes.comment__username}>
						{comment?.commentedBy?.username}
					</span>
					<p className={classes.comment__text}>{comment?.comment}</p>
				</div>
			</div>
			{comment?.images && comment?.images[0] !== "" && (
				<div className={classes.comment__additional}>
					<img
						src={comment?.images[0]?.images[0]?.url}
						alt='image'
						className={classes.comment__img}
					/>
					<Moment fromNow interval={30} className={classes.comment__time}>
						{comment?.commentAt}
					</Moment>
				</div>
			)}
		</div>
	);
}
