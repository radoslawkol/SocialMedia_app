import React from "react";
import classes from "./Friends.module.scss";
import { Link } from "react-router-dom";

export default function Friends() {
	return (
		<div className={classes.friends}>
			<div className={classes.friends__header}>
				<h2 className={classes.friends__heading}>Friends</h2>
				<Link to='/friends' className={classes.friends__btn}>
					See all friends
				</Link>
			</div>
			<span className={classes.friends__count}>82 friends</span>
			<div className={classes.friends__container}></div>
		</div>
	);
}
