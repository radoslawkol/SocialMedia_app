import React from "react";
import classes from "./SideMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserGroup,
	faMessage,
	faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SideMenu() {
	const color = "#8F00FF";
	return (
		<div className={classes.sideMenu}>
			<ul className={classes.menu}>
				<Link to='/profile' className={classes.item}>
					<img
						src='https://res.cloudinary.com/detfhw9ll/image/upload/v1655054300/AdamMarkowicz/profile_pictures/mfs9c11fmmn7q8intmbv.jpg'
						alt='profile image'
						className={classes.img}
					/>
					<span className={classes.name}>Marek Nowak</span>
				</Link>
				<li className={classes.item}>
					<FontAwesomeIcon
						icon={faUserGroup}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Friends</span>
				</li>
				<li className={classes.item}>
					<FontAwesomeIcon
						icon={faMessage}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Chat</span>
				</li>
				<li className={classes.item}>
					<FontAwesomeIcon
						icon={faBookmark}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Saved</span>
				</li>
			</ul>
		</div>
	);
}
