import React from "react";
import classes from "./SideMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserGroup,
	faMessage,
	faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideMenu() {
	const color = "#8F00FF";
	const { user } = useSelector((state) => ({ ...state }));
	return (
		<div className={classes.sideMenu}>
			<ul className={classes.menu}>
				<Link to='/profile' className={classes.item}>
					<img src={user.picture} alt='profile image' className={classes.img} />
					<span
						className={classes.name}
					>{`${user.firstName} ${user.lastName}`}</span>
				</Link>
				<Link to='/friends' className={classes.item}>
					<FontAwesomeIcon
						icon={faUserGroup}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Friends</span>
				</Link>
				<Link to='/chat' className={classes.item}>
					<FontAwesomeIcon
						icon={faMessage}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Chat</span>
				</Link>
				<Link to='/saved' className={classes.item}>
					<FontAwesomeIcon
						icon={faBookmark}
						color={color}
						className={classes.icon}
					></FontAwesomeIcon>
					<span className={classes.name}>Saved</span>
				</Link>
			</ul>
		</div>
	);
}
