import React, { useRef } from "react";
import classes from "./Profile.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useclickOutsideClose from "../../functions/useClickOutsideClose";

export default function ProfileModal({ setShowProfileModal }) {
	const modal = useRef();
	useclickOutsideClose(modal, () => setShowProfileModal(false));
	return (
		<div className={classes.modal} ref={modal}>
			<Link to={`/profile`} className={classes.modal__content}>
				<img
					src='https://res.cloudinary.com/detfhw9ll/image/upload/v1655054300/AdamMarkowicz/profile_pictures/mfs9c11fmmn7q8intmbv.jpg'
					alt='profile image'
					className={classes.modal__img}
				/>
				<div>
					<span className={classes.modal__name}>Marek Nowak</span>
					<p className={classes.modal__text}>See your profile</p>
				</div>
			</Link>
			<div className={classes.logout}>
				<div className={classes.logout__circle}>
					<FontAwesomeIcon
						icon={faRightFromBracket}
						className={classes.logout__icon}
					></FontAwesomeIcon>
				</div>
				<span className={classes.logout__text}>Log out</span>
			</div>
		</div>
	);
}
