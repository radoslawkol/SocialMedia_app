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
export default function ReactsPopup({ popupVisible, setPopupVisible }) {
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
							<button className={classes.popup__react} key={i}>
								<FontAwesomeIcon icon={react.icon} color={react.color} />
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}
