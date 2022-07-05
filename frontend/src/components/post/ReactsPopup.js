import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faThumbsUp,
	faFaceSmile,
	faFaceFrown,
	faFaceAngry,
	faHeart,
	faFaceGrinStars,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./ReactsPopup.module.scss";
import { reactPost } from "../../functions/post";
import { useSelector } from "react-redux";

const reacts = [
	{
		name: "love",
		icon: faHeart,
		color: "red",
	},
	{
		name: "like",
		icon: faThumbsUp,
		color: "#ebc934",
	},
	{
		name: "happy",
		icon: faFaceSmile,
		color: "#ebc934",
	},
	{
		name: "wow",
		icon: faFaceGrinStars,
		color: "#ebc934",
	},
	{
		name: "sad",
		icon: faFaceFrown,
		color: "#1ba4d1",
	},
	{
		name: "angry",
		icon: faFaceAngry,
		color: "black",
	},
];
export default function ReactsPopup({
	popupVisible,
	setPopupVisible,
	postId,
	setReact,
}) {
	const { user } = useSelector((state) => ({ ...state }));

	const reactHandler = async (react) => {
		await reactPost(postId, react, user.token);
		setReact(react);
	};

	return (
		<>
			{popupVisible && (
				<div
					className={classes.popup}
					onMouseOver={() =>
						setTimeout(() => {
							setPopupVisible(true);
						}, 500)
					}
					onMouseLeave={() =>
						setTimeout(() => {
							setPopupVisible(false);
						}, 500)
					}
				>
					{reacts.map((react, i) => {
						return (
							<button
								className={classes.popup__react}
								key={i}
								onClick={() => reactHandler(react.name)}
							>
								<FontAwesomeIcon icon={react.icon} color={react.color} />
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}
