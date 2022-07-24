import React from "react";
import classes from "./Message.module.scss";
import Moment from "react-moment";

export default function Message({ user, friend, own, message }) {
	if (own) {
		return (
			<div
				className={`${classes.box__messageWrap}  ${classes["box__messageWrap--user"]}`}
			>
				<img
					src={user?.picture}
					alt='user picture'
					className={classes.box__picture}
				/>
				<div
					className={`${classes.box__message} ${classes["box__message--user"]}`}
				>
					<p className={classes.box__text}>{message.text}</p>
				</div>
				<span className={classes.box__time}>
					<Moment fromNow>{message.createdAt}</Moment>
				</span>
			</div>
		);
	} else {
		return (
			<div className={classes.box__messageWrap}>
				<img
					src={friend?.picture}
					alt='user picture'
					className={classes.box__picture}
				/>
				<div className={classes.box__message}>
					<p className={classes.box__text}>{message?.text}</p>
				</div>
				<span className={classes.box__time}>
					<Moment fromNow>{message.createdAt}</Moment>
				</span>
			</div>
		);
	}
}
