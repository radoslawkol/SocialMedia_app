import React from "react";
import classes from "./Conversation.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Conversation({ conversation, user }) {
	const [friend, setFriend] = useState();

	console.log(friend);

	useEffect(() => {
		const friend = conversation?.members?.find(
			(member) => member._id !== user.id
		);
		setFriend(friend);
	}, [friend]);

	return (
		<div className={classes.menu__item}>
			<img
				src={friend?.picture}
				alt='friend image'
				className={classes.menu__img}
			/>
			<p
				className={classes.menu__name}
			>{`${friend?.firstName} ${friend?.lastName} `}</p>
		</div>
	);
}
