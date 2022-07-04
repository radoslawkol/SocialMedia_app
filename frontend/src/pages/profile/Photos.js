import React, { useReducer, useEffect } from "react";
import classes from "./Photos.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Photos({ user, username, photos }) {
	const navigate = useNavigate();

	console.log(photos);

	return (
		<div className={classes.photos}>
			<h2 className={classes.photos__heading}>Photos</h2>
			{photos && photos.length !== 0 && (
				<div className={classes.photos__list}>
					{photos?.slice(0, 9).map((photo, i) => {
						return (
							<img
								src={photo?.secure_url}
								alt="user's photo"
								key={i}
								className={classes.photos__photo}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
