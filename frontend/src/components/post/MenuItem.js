import React from "react";
import classes from "./MenuItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuItem({ icon, title, subtitle }) {
	return (
		<li className={classes.item}>
			<FontAwesomeIcon icon={icon} className={classes.item__icon} />
			<div className={classes.item__text}>
				<h4 className={classes.item__title}>{title}</h4>
				<span className={classes.item__subtitle}>{subtitle}</span>
			</div>
		</li>
	);
}
