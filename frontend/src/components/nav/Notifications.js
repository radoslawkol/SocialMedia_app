import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import useclickOutsideClose from "../../functions/useClickOutsideClose";
import NotificationItem from "./NotificationItem";
import classes from "./Notifications.module.scss";

export default function Notifications({
	setShowNotificationsModal,
	notifications,
	setNotifications,
}) {
	const modal = useRef();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	});

	useclickOutsideClose(modal, () => setShowNotificationsModal(false));
	return (
		<div className={classes.modal} ref={modal}>
			<h3 className={classes.modal__heading}>Notifications</h3>
			{notifications && notifications.length > 0 ? (
				<ul className={classes.modal__content}>
					{notifications.length > 0 &&
						notifications.map((notification, i) => {
							return <NotificationItem notification={notification} key={i} />;
						})}
				</ul>
			) : loading ? (
				<div className={classes.modal__loader}>
					<FadeLoader size={10} color='#8F00FF' />
				</div>
			) : (
				<p className={classes.modal__message}>
					You do not have any notifications
				</p>
			)}
		</div>
	);
}
