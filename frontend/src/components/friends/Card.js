import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
	acceptRequest,
	addFriend,
	cancelRequest,
	deleteRequest,
	unfriend,
} from "../../functions/friendsFunctions";
import classes from "./Card.module.scss";

export default function Card({ otherUser, type, getData }) {
	const { user } = useSelector((state) => ({ ...state }));
	const cardRef = useRef();

	const cancelRequestHandler = async () => {
		const res = await cancelRequest(otherUser._id, user.token);

		if (res === "ok") {
			cardRef.current.remove();
		}
	};
	const confirmHandler = async () => {
		const res = await acceptRequest(otherUser._id, user.token);

		if (res === "ok") {
			getData();
		}
	};
	const deleteRequestHandler = async () => {
		const res = await deleteRequest(otherUser._id, user.token);

		if (res === "ok") {
			cardRef.current.remove();
		}
	};
	const unfriendHandler = async () => {
		const res = await unfriend(otherUser._id, user.token);

		if (res === "ok") {
			cardRef.current.remove();
		}
	};
	const addFriendHandler = async () => {
		const res = await addFriend(otherUser._id, user.token);

		if (res === "ok") {
			getData();
		}
	};
	return (
		<div className={classes.card} ref={cardRef}>
			<img
				src={otherUser.picture}
				alt='user picture'
				className={classes.card__picture}
			/>
			<p
				className={classes.card__name}
			>{`${otherUser.firstName} ${otherUser.lastName}`}</p>
			<div className={classes.card__btns}>
				{type === "friendRequests" && (
					<>
						<button
							className={`${classes.card__btn} btn btn--purple`}
							onClick={confirmHandler}
						>
							Confirm
						</button>
						<button
							className={`${classes.card__btn} btn btn--grey`}
							onClick={deleteRequestHandler}
						>
							Remove
						</button>
					</>
				)}
				{type === "yourRequests" && (
					<>
						<button
							className={`${classes.card__btn} ${classes["card__btn--alone"]} btn btn--purple`}
							onClick={cancelRequestHandler}
						>
							Cancel
						</button>
					</>
				)}
				{type === "friendsProposal" && (
					<>
						<button
							className={`${classes.card__btn} ${classes["card__btn--alone"]} btn btn--purple`}
							onClick={addFriendHandler}
						>
							Add friend
						</button>
					</>
				)}
				{type === "friends" && (
					<>
						<button
							className={`${classes.card__btn} ${classes["card__btn--alone"]} btn btn--purple`}
							onClick={unfriendHandler}
						>
							Unfriend
						</button>
					</>
				)}
			</div>
		</div>
	);
}
