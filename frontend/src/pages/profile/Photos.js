import React, { useReducer, useEffect } from "react";
import classes from "./Photos.module.scss";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function Photos({ user, username, photos }) {
	const navigate = useNavigate();

	return (
		<div className={classes.photos}>
			<h2 className={classes.photos__heading}>Photos</h2>
			{!photos ? (
				<div className={classes.photos__loader}>
					<PulseLoader size={10} color='#8F00FF' />
				</div>
			) : (
				photos &&
				photos.length !== 0 && (
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
				)
			)}
		</div>
	);
}
