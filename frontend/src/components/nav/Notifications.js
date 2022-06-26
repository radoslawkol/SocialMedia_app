import React, { useRef } from "react";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import classes from "./Notifications.module.scss";

export default function Notifications({ setShowNotificationsModal }) {
	const modal = useRef();
	useclickOutsideClose(modal, () => setShowNotificationsModal(false));
	return (
		<div className={classes.modal} ref={modal}>
			<h3 className={classes.modal__heading}>Notifications</h3>
		</div>
	);
}
