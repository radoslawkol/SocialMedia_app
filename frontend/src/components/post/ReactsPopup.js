import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ReactsPopup.module.scss";
import { reactPost } from "../../functions/post";
import { useSelector } from "react-redux";
import { reactsArr } from "../../data";

export default function ReactsPopup({
	popupVisible,
	setPopupVisible,
	reactHandler,
}) {
	const { user } = useSelector((state) => ({ ...state }));

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
					{reactsArr.map((react, i) => {
						return (
							<button
								className={classes.popup__react}
								key={i}
								onClick={() => reactHandler(react)}
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
