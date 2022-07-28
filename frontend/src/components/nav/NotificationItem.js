import React from "react";
import classes from "./NotificationItem.module.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default function NotificationItem({ notification }) {
	return (
		<Link
			className={classes.item}
			to={`/profile/${notification.sender.username}`}
		>
			<img
				src={notification.sender.picture}
				alt='user picture'
				className={classes.item__picture}
			/>
			<div className={classes.item__content}>
				<strong
					className={classes.item__name}
				>{`${notification.sender.firstName} ${notification.sender.lastName}`}</strong>
				<p className={classes.item__text}>
					{notification.type === "newPost"
						? "Added a new post"
						: notification.type === "newPicture"
						? `Updated ${
								notification.sender.gender === "male" ? "his" : "her"
						  } profile picture`
						: notification.type === "sharedPost"
						? "Shared your post"
						: notification.type === "commentedPost"
						? "Commented your post"
						: notification.type === "friendRequest"
						? "Sent you a friend request"
						: notification.type === "acceptRequest"
						? "Accepted your friend request"
						: ""}
				</p>
				<span className={classes.item__time}>
					<Moment fromNow>{notification.createdAt}</Moment>
				</span>
			</div>
		</Link>
	);
}
